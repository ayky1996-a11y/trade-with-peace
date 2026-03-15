import React from 'react';
import { Button } from './ui/button';
import { CheckCircle2, TrendingUp } from 'lucide-react';

const HeroSection = ({ data }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F4C81" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2ECC71" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M 0 300 Q 250 250 500 280 T 1000 260 T 1500 290 T 2000 270"
              stroke="url(#chartGradient)"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              <TrendingUp size={16} />
              <span>Your Journey to Consistent Trading Starts Here</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                {data.headline}
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              {data.subheadline}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {data.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={20} className="text-green-500" />
                  <span className="font-medium">{badge}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                {data.primaryCTA}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 px-8 py-6 text-lg font-semibold transition-all"
              >
                {data.secondaryCTA}
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-green-500/20 z-10"></div>
              <img
                src={data.profileImage}
                alt="Abhay Yadav - Trade With Peace"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 backdrop-blur-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">500+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Active Traders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
