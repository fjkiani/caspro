-- ============================================================
-- Migration 002: Real CA-125 kinetics columns for plco_cancer_kinetics
-- ============================================================
-- Replaces reliance on the crude peak-minus-trough `ca125_rise_delta` with
-- principled longitudinal features computed by the backend kinetics engine
-- (kinetics/plco_ca125_kinetics.py): log-linear slope and CA-125 velocity.
--
-- SCOPE: screening early-signal only (validated vs incident ovarian cancer,
-- AUROC ~0.65, 95% CI excludes 0.5, n=28,775). NOT a treatment-resistance
-- feature. Method faithful to Xu 2011 (PLCO CA-125 velocity), Blyuss 2018,
-- Menon 2015 (ROCA).
--
-- Deployment: run against the live Supabase project with the service key.
-- The sandbox does NOT execute this; it is a reviewed artifact for the user.
-- ============================================================

-- Persist per-patient kinetics computed offline (loaded via COPY / upsert from
-- plco_kinetics_per_patient.csv). One row per plco_id.
CREATE TABLE IF NOT EXISTS plco_ca125_kinetics_features (
    plco_id            BIGINT PRIMARY KEY,
    n_timepoints       INT,
    ca125_logslope     DOUBLE PRECISION,   -- ln(U/mL) per year (primary, validated)
    ca125_velocity     DOUBLE PRECISION,   -- U/mL per year (secondary comparator)
    ca125_baseline     DOUBLE PRECISION,
    ca125_peak         DOUBLE PRECISION,
    modeling_approach  TEXT DEFAULT 'log_linear_ols',
    computed_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ca125_kin_logslope ON plco_ca125_kinetics_features(ca125_logslope);
CREATE INDEX IF NOT EXISTS idx_ca125_kin_velocity ON plco_ca125_kinetics_features(ca125_velocity);

-- Rebuild the kinetics MV to expose the principled features alongside the legacy
-- delta (kept for backward-compat, now clearly superseded).
DROP MATERIALIZED VIEW IF EXISTS plco_cancer_kinetics;
CREATE MATERIALIZED VIEW plco_cancer_kinetics AS
SELECT
    p.plco_id,
    p.ovar_cancer,
    p.ovar_stage,
    p.ovar_grade,
    p.ovar_histtype,
    p.ovar_cancer_diagdays,
    p.is_dead,
    p.mortality_exitdays,
    p.arm,
    s0.ca125_level AS ca125_t0,
    s1.ca125_level AS ca125_t1,
    s2.ca125_level AS ca125_t2,
    s3.ca125_level AS ca125_t3,
    s4.ca125_level AS ca125_t4,
    s5.ca125_level AS ca125_t5,
    -- Legacy crude delta (kept, superseded):
    GREATEST(s0.ca125_level, s1.ca125_level, s2.ca125_level,
             s3.ca125_level, s4.ca125_level, s5.ca125_level)
    - LEAST(s0.ca125_level, s1.ca125_level, s2.ca125_level,
            s3.ca125_level, s4.ca125_level, s5.ca125_level) AS ca125_rise_delta,
    -- Principled, validated kinetics:
    k.n_timepoints        AS ca125_n_timepoints,
    k.ca125_logslope      AS ca125_logslope,
    k.ca125_velocity      AS ca125_velocity,
    k.ca125_baseline      AS ca125_baseline,
    k.ca125_peak          AS ca125_peak
FROM plco_patients p
LEFT JOIN plco_ca125_series s0 ON p.plco_id = s0.plco_id AND s0.timepoint = 0
LEFT JOIN plco_ca125_series s1 ON p.plco_id = s1.plco_id AND s1.timepoint = 1
LEFT JOIN plco_ca125_series s2 ON p.plco_id = s2.plco_id AND s2.timepoint = 2
LEFT JOIN plco_ca125_series s3 ON p.plco_id = s3.plco_id AND s3.timepoint = 3
LEFT JOIN plco_ca125_series s4 ON p.plco_id = s4.plco_id AND s4.timepoint = 4
LEFT JOIN plco_ca125_series s5 ON p.plco_id = s5.plco_id AND s5.timepoint = 5
LEFT JOIN plco_ca125_kinetics_features k ON p.plco_id = k.plco_id;

CREATE INDEX ON plco_cancer_kinetics(ovar_cancer);
CREATE INDEX ON plco_cancer_kinetics(ca125_logslope);
CREATE INDEX ON plco_cancer_kinetics(ca125_velocity);

-- refresh_plco_kinetics_view() RPC already exists; it will refresh this MV.
-- After loading plco_ca125_kinetics_features: SELECT refresh_plco_kinetics_view();
