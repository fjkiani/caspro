'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, Award, BookOpen, Users, ChevronDown, ChevronUp } from 'lucide-react';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in">{title}</h3>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in-delay">{subtitle}</p>
    </div>
);

const SkillBar = ({ skill, level, color }: { skill: string, level: number, color: string }) => (
    <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-300">{skill}</span>
            <span className="text-gray-400">{level}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${color}`}
                style={{ width: `${level}%` }}
            ></div>
        </div>
    </div>
);

const TeamMemberCard = ({ member, index }: { member: any, index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`group p-6 bg-gray-800 border border-gray-700 rounded-lg transition-all duration-300 cursor-pointer animate-fade-in animate-stagger-${index + 1} ${
                isHovered ? 'border-blue-500 bg-gray-800/80 scale-105' : 'hover:border-gray-600'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Avatar and Basic Info */}
            <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.avatarGradient} flex items-center justify-center text-white font-bold text-xl transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                }`}>
                    {member.initials}
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors duration-200">
                        {member.name}
                    </h4>
                    <p className="text-blue-400 font-medium">{member.role}</p>
                    <p className="text-sm text-gray-400">{member.experience} years experience</p>
                </div>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
            </div>

            {/* Quick Bio */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.bio}</p>

            {/* Skills Preview */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    {member.skills.slice(0, 3).map((skill: string, idx: number) => (
                        <span 
                            key={idx}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                        >
                            {skill}
                        </span>
                    ))}
                    {member.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                            +{member.skills.length - 3} more
                        </span>
                    )}
                </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 mb-4">
                {member.linkedin && (
                    <a href={member.linkedin} className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                        <Linkedin className="w-4 h-4" />
                    </a>
                )}
                {member.github && (
                    <a href={member.github} className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                        <Github className="w-4 h-4" />
                    </a>
                )}
                {member.email && (
                    <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                        <Mail className="w-4 h-4" />
                    </a>
                )}
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="border-t border-gray-700 pt-4 mt-4 animate-fade-in">
                    {/* All Skills with Levels */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-white mb-3 flex items-center space-x-2">
                            <Award className="w-4 h-4 text-yellow-400" />
                            <span>Expertise</span>
                        </h5>
                        {member.skillLevels.map((skillData: any, idx: number) => (
                            <SkillBar 
                                key={idx}
                                skill={skillData.skill} 
                                level={skillData.level} 
                                color={skillData.color}
                            />
                        ))}
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                        <h5 className="font-semibold text-white mb-3 flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-green-400" />
                            <span>Key Achievements</span>
                        </h5>
                        <ul className="space-y-2">
                            {member.achievements.map((achievement: string, idx: number) => (
                                <li key={idx} className="text-sm text-gray-300 flex items-start space-x-2">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Previous Companies */}
                    <div>
                        <h5 className="font-semibold text-white mb-3 flex items-center space-x-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span>Previous Experience</span>
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            {member.previousCompanies.map((company: string, idx: number) => (
                                <span 
                                    key={idx}
                                    className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg border border-gray-600"
                                >
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const TeamSection = () => {
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'technical' | 'clinical'>('all');

    const teamMembers = [
        {
            name: "Fahad Kiani",
            role: "Chief Technical and Executive Officer & Co-Founder",
            experience: 12,
            bio: "Fahad is a seasoned entrepreneur with a passion for using technology to improve healthcare. He is the co-founder of Jedilabs.org, a non-profit organization dedicated to advancing AI and ML in healthcare. Previosuly was a Senior Solutions Engineer at Talend, supporting enterprise customers around data integration and data governance. Led successful exits of 1stDibs and iMedicare as a founding team member.",
            skills: ["CRISPR", "Prompt Engineering", "Computational Biology", "Oncology", "Teaching"],
            skillLevels: [
                { skill: "AI Engineering", level: 100, color: "bg-blue-500" },
                { skill: "Molecular Biology", level: 90, color: "bg-purple-500" },
                { skill: "Full Stack Development", level: 100, color: "bg-green-500" },
                { skill: "Leadership", level: 85, color: "bg-yellow-500" },
            ],
            achievements: [
                "Completed 2 New York City Marathon",
                "Founded Jedilabs.org, a non-profit organization dedicated to advancing AI and ML in healthcare",
                "Computer Science and Molecular Biology BS from John Jay College of Criminal Justice",
                "Holds 1 patent in gene editing technology"
            ],
            previousCompanies: ["JediLabs.org", "Talend", "1stDibs", "iMedicare"],
            initials: "FJK",
            avatarGradient: "from-blue-500 to-purple-600",
            linkedin: "https://linkedin.com/in/fjkiani",
            email: "fahad@jedilabs.org",
            category: "technical"
        },
        {
            name: "Rahima Nayeem",
            role: "Chief Clinical Officer & Co-Founder",
            experience: 10,
            bio: "Dr. Rahima Nayeem is an internist in  New York and is affiliated with North Shore University Hospital at Northwell Health. She received her medical degree from State University of New York Downstate Medical Center College of Medicine and has been in practice between 6-10 years",
            skills: ["Life Science", "Chemistry", "Patient Care", "Clinical Research"],
            skillLevels: [
                { skill: "Medicine", level: 100, color: "bg-red-500" },
                { skill: "Chemistry", level: 100, color: "bg-blue-500" },
                { skill: "Patient Care", level: 100, color: "bg-green-500" },
                { skill: "Clinical Research", level: 100, color: "bg-purple-500" },
            ],
            achievements: [
                "MD Graduat from SUNY Downstate Medical Center",
                "American Board of Internal Medicine Certified",
                "Completed residency at Hofstra North Shore-Lij School Of Medicine",
            ],
            previousCompanies: ["North Shore University Hospital", "Long Island Jewish Valley Stream", "Long Island Jewish Medical Center"],
            initials: "RN",
            avatarGradient: "from-red-500 to-orange-600",
            // github: "https://github.com/mrodriguez",
            // linkedin: "https://linkedin.com/in/michaelrodriguez",
            email: "nayeem.rahima@gmail.com",
            category: "clinical"
        },
        // {
        //     name: "Dr. James Park",
        //     role: "VP of Product & Strategy",
        //     experience: 10,
        //     bio: "Former McKinsey Partner with expertise in healthcare strategy and biotech commercialization. Led go-to-market for 5 FDA-approved therapeutics.",
        //     skills: ["Strategy", "Product Management", "Healthcare", "Business Development"],
        //     skillLevels: [
        //         { skill: "Strategic Planning", level: 93, color: "bg-blue-500" },
        //         { skill: "Product Management", level: 87, color: "bg-green-500" },
        //         { skill: "Healthcare Markets", level: 95, color: "bg-purple-500" },
        //         { skill: "Business Development", level: 89, color: "bg-yellow-500" },
        //     ],
        //     achievements: [
        //         "Led commercialization of $2B+ in biotech products",
        //         "Advised 20+ biotech IPOs and acquisitions",
        //         "Former venture partner at Andreessen Horowitz Bio Fund",
        //         "MBA from Wharton, MD from Johns Hopkins"
        //     ],
        //     previousCompanies: ["McKinsey & Company", "Genentech", "a16z Bio Fund"],
        //     initials: "JP",
        //     avatarGradient: "from-green-500 to-teal-600",
        //     linkedin: "https://linkedin.com/in/jamespark",
        //     email: "james@crispro.ai",
        //     category: "business"
        // },
        // {
        //     name: "Dr. Emily Watson",
        //     role: "Chief Scientific Advisor",
        //     experience: 20,
        //     bio: "Nobel Prize nominee and pioneer in cancer genomics. Former Director of Precision Oncology at Memorial Sloan Kettering with 200+ publications.",
        //     skills: ["Cancer Biology", "Genomics", "Clinical Research", "Regulatory Affairs"],
        //     skillLevels: [
        //         { skill: "Cancer Biology", level: 99, color: "bg-red-500" },
        //         { skill: "Genomics", level: 96, color: "bg-blue-500" },
        //         { skill: "Clinical Research", level: 94, color: "bg-green-500" },
        //         { skill: "Regulatory Strategy", level: 85, color: "bg-purple-500" },
        //     ],
        //     achievements: [
        //         "Nobel Prize nominee for cancer genomics research",
        //         "Led clinical trials for 15+ FDA-approved cancer therapies",
        //         "Authored 200+ publications with 50,000+ citations",
        //         "Founded 3 successful biotech companies (2 IPOs, 1 acquisition)"
        //     ],
        //     previousCompanies: ["Memorial Sloan Kettering", "Dana-Farber", "Novartis"],
        //     initials: "EW",
        //     avatarGradient: "from-purple-500 to-pink-600",
        //     linkedin: "https://linkedin.com/in/emilywatson",
        //     email: "emily.advisor@crispro.ai",
        //     category: "advisory"
        // }
    ];

    const filteredMembers = teamMembers.filter(member => 
        selectedFilter === 'all' || member.category === selectedFilter
    );

    const filterOptions = [
        { value: 'all', label: 'All Team', count: teamMembers.length },
        { value: 'technical', label: 'Technical', count: teamMembers.filter(m => m.category === 'technical').length },
        { value: 'clinical', label: 'Clinical', count: teamMembers.filter(m => m.category === 'clinical').length },
    ];

    return (
        <section className="mb-20">
            <SectionHeader
                title="5.0 Team: The Architects of Biological Innovation"
                subtitle="Our founding team combines world-class expertise in CRISPR technology, AI/ML, and biotech commercialization. We are the rare team that can both envision and execute the future of precision medicine."
            />

            {/* Team Filter */}
            <div className="mb-8 flex justify-center">
                <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
                    {filterOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => setSelectedFilter(option.value as any)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                selectedFilter === option.value
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                            }`}
                        >
                            {option.label} ({option.count})
                        </button>
                    ))}
                </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredMembers.map((member, index) => (
                    <TeamMemberCard 
                        key={member.name} 
                        member={member} 
                        index={index}
                    />
                ))}
            </div>

            {/* Team Stats
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover-lift">
                    <div className="text-3xl font-bold text-blue-400 mb-2">250+</div>
                    <div className="text-sm text-gray-400">Combined Publications</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover-lift">
                    <div className="text-3xl font-bold text-green-400 mb-2">$100M+</div>
                    <div className="text-sm text-gray-400">Previously Raised</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover-lift">
                    <div className="text-3xl font-bold text-purple-400 mb-2">25+</div>
                    <div className="text-sm text-gray-400">Patents Held</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg hover-lift">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
                    <div className="text-sm text-gray-400">Successful Exits</div>
                </div>
            </div> */}
        </section>
    );
}; 