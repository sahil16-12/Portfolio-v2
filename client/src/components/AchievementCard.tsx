import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';

interface AchievementCardProps {
    achievement: {
        title: string;
        description: string;
        icon: React.ReactNode;
        year: string;
        details: {
            event: string;
            organizer: string;
            participants: string;
            achievement: string;
            project: string;
            certificate: string;
        };
    };
    isExpanded: boolean;
    onClick: () => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
    achievement,
    isExpanded,
    onClick
}) => {
    return (
        <motion.div
            layout
            className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-cherry/30 transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            {/* Card content */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-cherry/20 flex items-center justify-center">
                    {achievement.icon}
                </div>
                <div>
                    <h4 className="text-xl font-bold text-offWhite">{achievement.title}</h4>
                    <p className="text-cherry">{achievement.year}</p>
                </div>
            </div>
            
            <p className="text-offWhite/80 mb-4">{achievement.description}</p>
            
            <motion.div
                layout
                className="space-y-4"
            >
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-2 pt-4 border-t border-white/10"
                    >
                        {Object.entries(achievement.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center">
                                <span className="text-offWhite/60 capitalize">{key.replace(/_/g, ' ')}</span>
                                <span className="text-cherry font-medium">{value}</span>
                            </div>
                        ))}
                        
                        <a
                            href={achievement.details.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-cherry hover:text-cherry/80 mt-4"
                        >
                            <FaCertificate />
                            <span>View Certificate</span>
                        </a>
                    </motion.div>
                )}
            </motion.div>
            
            <motion.button
                onClick={onClick}
                className="w-full mt-4 px-4 py-2 rounded-xl border border-cherry/50 text-cherry flex items-center justify-center gap-2 hover:bg-cherry/10 transition-all"
            >
                <span>{isExpanded ? 'Show Less' : 'View Details'}</span>
            </motion.button>
        </motion.div>
    );
};