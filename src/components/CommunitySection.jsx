import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, Users, MessageCircle, Youtube } from 'lucide-react';
import { toast } from 'sonner';

const CommunitySection = ({ data }) => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you! You will receive updates soon.');
      setEmail('');
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  return (
    <section id="community" className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-sm font-semibold">
            <Users size={16} />
            <span>{data.subscriberCount} Active Members</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Join the Peaceful Traders
            <span className="block text-green-400">Community</span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Connect with like-minded traders, get daily insights, and grow together
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Signup */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Get Market Updates</h3>
              <p className="text-slate-300 mb-6">
                Subscribe to receive daily market analysis and trading insights directly to your inbox.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-slate-300 focus:border-green-400"
                />
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold"
                >
                  <Send size={18} className="mr-2" />
                  Subscribe Now
                </Button>
              </form>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              {/* Telegram */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <Send size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Telegram Community</h4>
                    <p className="text-sm text-slate-300">Daily analysis & live discussions</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  onClick={() => window.open(data.telegramLink, '_blank')}
                >
                  <MessageCircle size={18} className="mr-2" />
                  Join Telegram
                </Button>
              </div>

              {/* Instagram */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-purple-500 to-orange-400 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">Instagram</h4>
                      <p className="text-sm text-slate-300">Daily tips & inspiration</p>
                    </div>
                  </div>
                  <img 
                    src={data.instagramQR} 
                    alt="Instagram QR" 
                    className="w-16 h-16 rounded-lg bg-white p-1"
                  />
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:opacity-90 text-white font-semibold"
                  onClick={() => window.open(data.instagramLink, '_blank')}
                >
                  Follow on Instagram
                </Button>
              </div>

              {/* YouTube */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                    <Youtube size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">YouTube Channel</h4>
                    <p className="text-sm text-slate-300">Video tutorials & live streams</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                  onClick={() => window.open(data.youtubeLink, '_blank')}
                >
                  <Youtube size={18} className="mr-2" />
                  Watch on YouTube
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
