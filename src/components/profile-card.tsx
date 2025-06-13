'use client';

import React from 'react';
import { MapPin, Calendar, Mail, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

/**
 * ProfileCardコンポーネント - プロフィール情報を表示
 */
export default function ProfileCard() {
  const profile = {
    name: 'Neo‑Typographic Developer',
    title: 'Frontend Engineer & 3D Web Developer',
    location: 'Tokyo, Japan',
    joinDate: '2020年4月',
    email: 'hello@example.com',
    bio: 'モダンなウェブ技術と3Dグラフィックスを組み合わせた、革新的なユーザーエクスペリエンスの創造に情熱を注いでいます。React、Three.js、TypeScriptを中心とした技術スタックで、美しく機能的なウェブアプリケーションを開発しています。',
    avatar: '👨‍💻',
    stats: {
      projects: 25,
      experience: '4年',
      technologies: 15,
      contributions: 500,
    },
    social: {
      github: 'https://github.com/username',
      twitter: 'https://twitter.com/username',
      linkedin: 'https://linkedin.com/in/username',
    },
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gradient-to-br from-[#FF2D55]/20 to-[#1479FF]/20 p-8 text-center">
        <div className="text-6xl mb-4">{profile.avatar}</div>
        <h2 className="text-2xl font-bold font-heading text-[#F9F9F9] mb-2">
          {profile.name}
        </h2>
        <p className="text-[#1479FF] font-medium mb-4">
          {profile.title}
        </p>
        
        {/* 基本情報 */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-[#7A7A7A]">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            {profile.location}
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {profile.joinDate}から
          </div>
        </div>
      </div>

      {/* プロフィール詳細 */}
      <div className="p-8">
        {/* 自己紹介 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#F9F9F9] mb-4">About</h3>
          <p className="text-[#7A7A7A] leading-relaxed">
            {profile.bio}
          </p>
        </div>

        {/* 統計情報 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#F9F9F9] mb-4">Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0F0F0F] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#FF2D55] mb-1">
                {profile.stats.projects}
              </div>
              <div className="text-sm text-[#7A7A7A]">プロジェクト</div>
            </div>
            
            <div className="bg-[#0F0F0F] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#1479FF] mb-1">
                {profile.stats.experience}
              </div>
              <div className="text-sm text-[#7A7A7A]">経験年数</div>
            </div>
            
            <div className="bg-[#0F0F0F] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#F5C400] mb-1">
                {profile.stats.technologies}
              </div>
              <div className="text-sm text-[#7A7A7A]">技術スタック</div>
            </div>
            
            <div className="bg-[#0F0F0F] p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#FF2D55] mb-1">
                {profile.stats.contributions}+
              </div>
              <div className="text-sm text-[#7A7A7A]">コントリビューション</div>
            </div>
          </div>
        </div>

        {/* ソーシャルリンク */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#F9F9F9] mb-4">Connect</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-[#F9F9F9] hover:border-[#FF2D55] hover:text-[#FF2D55] transition-all duration-300 hover:scale-105"
            >
              <Github size={18} className="mr-2" />
              GitHub
              <ExternalLink size={14} className="ml-2" />
            </a>
            
            <a
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-[#F9F9F9] hover:border-[#1479FF] hover:text-[#1479FF] transition-all duration-300 hover:scale-105"
            >
              <Twitter size={18} className="mr-2" />
              Twitter
              <ExternalLink size={14} className="ml-2" />
            </a>
            
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg text-[#F9F9F9] hover:border-[#F5C400] hover:text-[#F5C400] transition-all duration-300 hover:scale-105"
            >
              <Linkedin size={18} className="mr-2" />
              LinkedIn
              <ExternalLink size={14} className="ml-2" />
            </a>
          </div>
        </div>

        {/* コンタクト */}
        <div>
          <h3 className="text-lg font-bold text-[#F9F9F9] mb-4">Contact</h3>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-[#FF2D55] to-[#1479FF] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Mail size={18} className="mr-2" />
            メールを送る
          </a>
        </div>
      </div>
    </div>
  );
} 