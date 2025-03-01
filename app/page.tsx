"use client"
import React from 'react';
import Index from "@/pages/Index"
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

interface LandingPageProps {
  onStartChat: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  return (
    <Index />


    // <div className="min-h-screen bg-gradient-to-b from-calm-lightest to-calm-light">
    //   {/* Navigation */}
    //   <nav className="bg-white shadow-sm">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="flex justify-between h-16">
    //         <div className="flex items-center">
    //           <span className="text-2xl font-bold text-primary-dark">MindfulAI</span>
    //         </div>
    //         <div className="flex items-center">
    //           <button 
    //             onClick={onStartChat}
    //             className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition-colors"
    //           >
    //             Start Chatting
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>

    //   {/* Hero Section */}
    //   <section className="py-12 sm:py-16 md:py-20 lg:py-24">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
    //         <div>
    //           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-neutral-darkest">
    //             Your AI Companion for Mental Wellbeing
    //           </h1>
    //           <p className="mt-4 text-xl text-neutral-dark max-w-3xl">
    //             A safe space to express your thoughts, find calm, and practice mindfulness with our supportive AI assistant.
    //           </p>
    //           <div className="mt-8">
    //             <button 
    //               onClick={onStartChat}
    //               className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-lg text-lg font-medium transition-colors"
    //             >
    //               Start Your Journey <FiArrowRight />
    //             </button>
    //           </div>
    //         </div>
    //         <div className="mt-10 lg:mt-0 flex justify-center">
    //           <div className="relative w-full max-w-lg h-80 md:h-96">
    //             <Image 
    //               src={"https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"}
    //               alt="Peaceful meditation scene" 
    //               className="rounded-lg shadow-xl"
    //               fill
    //               style={{ objectFit: 'cover' }}
    //               priority
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Features Section */}
    //   <section className="py-12 bg-white">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="text-center">
    //         <h2 className="text-3xl font-bold text-neutral-darkest">How MindfulAI Helps You</h2>
    //         <p className="mt-4 text-lg text-neutral-dark max-w-3xl mx-auto">
    //           Our AI companion is designed to support your mental wellbeing through various approaches
    //         </p>
    //       </div>

    //       <div className="mt-12 grid gap-8 md:grid-cols-3">
    //         <div className="bg-calm-lightest p-6 rounded-lg shadow-md">
    //           <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    //             </svg>
    //           </div>
    //           <h3 className="text-xl font-semibold text-neutral-darkest">Supportive Conversations</h3>
    //           <p className="mt-2 text-neutral-dark">
    //             Express your thoughts and feelings in a judgment-free space with an AI that responds with empathy and understanding.
    //           </p>
    //         </div>

    //         <div className="bg-calm-lightest p-6 rounded-lg shadow-md">
    //           <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    //             </svg>
    //           </div>
    //           <h3 className="text-xl font-semibold text-neutral-darkest">Guided Breathing</h3>
    //           <p className="mt-2 text-neutral-dark">
    //             Learn and practice simple breathing techniques that can help reduce stress and anxiety in moments of need.
    //           </p>
    //         </div>

    //         <div className="bg-calm-lightest p-6 rounded-lg shadow-md">
    //           <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    //             </svg>
    //           </div>
    //           <h3 className="text-xl font-semibold text-neutral-darkest">Safe & Private</h3>
    //           <p className="mt-2 text-neutral-dark">
    //             Your conversations are stored locally on your device, ensuring your personal thoughts remain private and secure.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Testimonials */}
    //   <section className="py-12 bg-calm-light">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <h2 className="text-3xl font-bold text-center text-neutral-darkest mb-12">What Users Say</h2>
          
    //       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    //         <div className="bg-white p-6 rounded-lg shadow-md">
    //           <div className="flex items-center mb-4">
    //             <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
    //               <span className="text-primary-dark font-bold">S</span>
    //             </div>
    //             <div className="ml-4">
    //               <h4 className="font-semibold">Sarah K.</h4>
    //               <div className="flex text-yellow-400">
    //                 <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    //               </div>
    //             </div>
    //           </div>
    //           <p className="text-neutral-dark">
    //             "This AI companion has been incredibly helpful during my anxiety episodes. The breathing exercises really work!"
    //           </p>
    //         </div>
            
    //         <div className="bg-white p-6 rounded-lg shadow-md">
    //           <div className="flex items-center mb-4">
    //             <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
    //               <span className="text-primary-dark font-bold">M</span>
    //             </div>
    //             <div className="ml-4">
    //               <h4 className="font-semibold">Michael T.</h4>
    //               <div className="flex text-yellow-400">
    //                 <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    //               </div>
    //             </div>
    //           </div>
    //           <p className="text-neutral-dark">
    //             "I was skeptical at first, but having a space to express my thoughts without judgment has been surprisingly therapeutic."
    //           </p>
    //         </div>
            
    //         <div className="bg-white p-6 rounded-lg shadow-md">
    //           <div className="flex items-center mb-4">
    //             <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
    //               <span className="text-primary-dark font-bold">J</span>
    //             </div>
    //             <div className="ml-4">
    //               <h4 className="font-semibold">Jamie L.</h4>
    //               <div className="flex text-yellow-400">
    //                 <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
    //               </div>
    //             </div>
    //           </div>
    //           <p className="text-neutral-dark">
    //             "I use this every night before bed to help calm my racing thoughts. It's become an essential part of my routine."
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* CTA Section */}
    //   <section className="py-16 bg-primary-dark text-white">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    //       <h2 className="text-3xl font-bold">Ready to Start Your Wellness Journey?</h2>
    //       <p className="mt-4 text-xl max-w-3xl mx-auto">
    //         Our AI companion is here to support you 24/7, whenever you need someone to talk to.
    //       </p>
    //       <div className="mt-8">
    //         <button 
    //           onClick={onStartChat}
    //           className="bg-white text-primary-dark hover:bg-calm-light py-3 px-8 rounded-lg text-lg font-medium transition-colors"
    //         >
    //           Chat Now
    //         </button>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Footer */}
    //   <footer className="bg-neutral-darkest text-white py-8">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="md:flex md:justify-between">
    //         <div className="mb-8 md:mb-0">
    //           <span className="text-2xl font-bold">MindfulAI</span>
    //           <p className="mt-2 text-neutral-light max-w-md">
    //             A calming AI companion to support your mental wellbeing journey.
    //           </p>
    //         </div>
    //         <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
    //           <div>
    //             <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
    //             <div className="mt-4 space-y-4">
    //               <a href="#" className="text-neutral-light hover:text-white block">Blog</a>
    //               <a href="#" className="text-neutral-light hover:text-white block">Guides</a>
    //               <a href="#" className="text-neutral-light hover:text-white block">Help Center</a>
    //             </div>
    //           </div>
    //           <div>
    //             <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
    //             <div className="mt-4 space-y-4">
    //               <a href="#" className="text-neutral-light hover:text-white block">Privacy</a>
    //               <a href="#" className="text-neutral-light hover:text-white block">Terms</a>
    //               <a href="#" className="text-neutral-light hover:text-white block">Cookie Policy</a>
    //             </div>
    //           </div>
    //           <div>
    //             <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
    //             <div className="mt-4 space-y-4">
    //               <a href="#" className="text-neutral-light hover:text-white block">About</a>
    //               <a href="#" className="text-neutral-light hover:text-white block">Contact</a>
    //               <a href="#" className="text-neutral-light hover:text-white block">Careers</a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
    //         <div className="flex space-x-6 md:order-2">
    //           <a href="#" className="text-neutral-light hover:text-white">
    //             <span className="sr-only">Facebook</span>
    //             <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    //               <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    //             </svg>
    //           </a>
    //           <a href="#" className="text-neutral-light hover:text-white">
    //             <span className="sr-only">Instagram</span>
    //             <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    //               <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    //             </svg>
    //           </a>
    //           <a href="#" className="text-neutral-light hover:text-white">
    //             <span className="sr-only">Twitter</span>
    //             <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    //               <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    //             </svg>
    //           </a>
    //         </div>
    //         <p className="mt-8 text-base text-neutral-light md:mt-0 md:order-1">
    //           © 2025 MindfulAI. All rights reserved.
    //         </p>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default LandingPage;