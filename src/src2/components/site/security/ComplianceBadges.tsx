import React from 'react';
import TrustBadges from '../TrustBadges';
import type { TrustBadge } from '../../../types/site';

type Props = { badges: TrustBadge[]; className?: string };

const ComplianceBadges: React.FC<Props> = ({ badges, className }) => (
  <TrustBadges badges={badges} className={className} />
);

export default ComplianceBadges; 