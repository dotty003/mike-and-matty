import { Zap, Users, Rocket, Star, Check, X, Plus, Minus, ArrowRight, Lock, Calendar, Play, CalendarCheck, BookOpen, Target, TrendingUp, Award, Heart, Shield, Lightbulb } from "lucide-react";
import React from "react";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Zap, Users, Rocket, Star, Check, X, Plus, Minus, ArrowRight, Lock, Calendar, Play, CalendarCheck, BookOpen, Target, TrendingUp, Award, Heart, Shield, Lightbulb,
};

export function getIcon(name: string): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  return iconMap[name] || Zap;
}

export const availableIcons = Object.keys(iconMap);
