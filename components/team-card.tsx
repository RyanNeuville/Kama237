"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon?: LucideIcon;
}

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  const IconComponent = member.icon;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: index * 0.1 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
    >
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
        {IconComponent ? (
          <IconComponent className="w-10 h-10 text-white" />
        ) : (
          <div className="text-2xl font-bold text-white">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-1">
        {member.name}
      </h3>
      <p className="text-primary font-medium mb-3">{member.role}</p>
      <p className="text-muted-foreground text-sm">{member.bio}</p>
    </motion.div>
  );
}
