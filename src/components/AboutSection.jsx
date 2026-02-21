import React from 'react';
import { Target, Users, Award } from 'lucide-react';

const AboutSection = ({ data }) => {
  const icons = [Users, Award, Target];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={data.image}
                alt="Trading Setup"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-green-500/10"></div>
            </div>

            {/* Stats Grid Overlay */}
            <div className="absolute -bottom-8 -right-8 grid grid-cols-3 gap-4">
              {data.stats.map((stat, index) => {
                const Icon = icons[index];
                return (
                  <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-4 backdrop-blur-lg">
                    <Icon className="text-blue-600 mb-2" size={24} />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
              About Me
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              {data.title}
            </h2>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {data.content}
            </p>

            <div className="space-y-4 pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Mission-Driven Approach
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Simplifying complex trading concepts and focusing on what truly matters - your consistent growth.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Proven Results
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Helped thousands of traders develop discipline, manage risk, and achieve their financial goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
