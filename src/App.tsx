import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Mail, MessageCircle, Globe, Palette, Camera, Video, Code, Bot, TrendingUp, FileText, Edit3 } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const openWhatsApp = (message: string = '') => {
    const phone = '917305115192';
    const defaultMessage = 'Hi ARRlSE DIGITAL, I\'d like to discuss a project with you.';
    const finalMessage = message || defaultMessage;
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    console.log('Opening WhatsApp with message:', finalMessage);
    console.log('WhatsApp URL:', whatsappUrl);
    
    window.open(whatsappUrl, '_blank');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      services: formData.get('services') as string,
      budget: formData.get('budget') as string,
      requirements: formData.get('requirements') as string
    };

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Prepare WhatsApp message BEFORE resetting form
      const message = `Hi ARRlSE DIGITAL, I'm interested in your services.\n\nName: ${contactData.name}\nEmail: ${contactData.email}\nServices: ${contactData.services}\nBudget: ${contactData.budget}\nProject Requirements:\n${contactData.requirements}`;
      
      // Reset form first
      form.reset();
      
      // Show success message
      alert('✅ Message sent successfully! Opening WhatsApp...');
      
      // Send WhatsApp message
      openWhatsApp(message);
      
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Something went wrong. Please try again.');
    } finally {
      // Reset button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoMnYtMmgtMnYtMmgtMnYyaC0ydjJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">ARRlSE DIGITAL</h1>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-6">
            {['About', 'Services', 'Team', 'Portfolio', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-white hover:text-blue-300 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-md bg-white/5 border-t border-white/10">
            {['About', 'Services', 'Team', 'Portfolio', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className={`container mx-auto text-center transition-all duration-1000 ${isVisible['hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 md:p-16 shadow-2xl max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              ARRlSE DIGITAL
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8">
              Creative • Marketing • Technology Solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Work With Us →
              </button>
              <button
                onClick={() => openWhatsApp()}
                className="px-8 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-full font-semibold hover:bg-white/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className={`container mx-auto max-w-4xl transition-all duration-1000 delay-200 ${isVisible['about'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">About Us</h2>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <p className="text-lg text-blue-100 leading-relaxed">
              Arrise Digital is a result-driven digital agency powered by a passionate team of 3 professionals.
              We help brands grow through creative design, impactful content, smart marketing, and modern technology solutions.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: 'Graphic Design', desc: 'Professional visual design for all your branding needs' },
              { icon: Camera, title: 'Photography', desc: 'Stunning photography that captures your brand essence' },
              { icon: Video, title: 'Videography', desc: 'High-quality video production for impactful storytelling' },
              { icon: FileText, title: 'Video Editing', desc: 'Professional editing with smooth transitions and effects' },
              { icon: Code, title: 'Website Development', desc: 'Modern, responsive websites built with latest technologies' },
              { icon: Bot, title: 'AI Chatbot Development', desc: 'Intelligent chatbots for enhanced customer engagement' },
              { icon: TrendingUp, title: 'Social Media Marketing', desc: 'Strategic SMM handling to grow your online presence' },
              { icon: Edit3, title: 'Content Creation', desc: 'Creative content strategies that captivate your audience' },
              { icon: Globe, title: 'Meta Ads & Digital Marketing', desc: 'Data-driven campaigns for maximum ROI' },
            ].map((service, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 ${isVisible['services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <service.icon className="text-blue-300 mb-4" size={40} />
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-blue-200 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'M. RM. ANNAMALAI',
                role: 'Creative Lead | SMM & Design Specialist',
                experience: '3+ years experience, 100+ clients',
                expertise: 'Social Media Marketing, Video Editing, Graphic Design (Menu Card, Business Card, Brochure, Letterhead, Logo, Poster & Package Design, Standee, ID/Certificate, Profile & Cover, Photo/Post, Thumbnails)',
                education: 'B.Tech – AI & Data Science, Ramco Institute'
              },
              {
                name: 'V. RAM VISWANATH',
                role: 'Media Production & Ads Specialist',
                experience: '2+ years experience, 25+ clients',
                expertise: 'Videography, Video Editing, Photography, Poster Design, Meta Ads, SMM',
                education: 'B.Tech – AI & Data Science, Ramco Institute'
              },
              {
                name: 'V. RAM ROJITH',
                role: 'Digital Strategist & Tech Lead',
                experience: '3+ years experience, 25+ clients',
                expertise: 'Content Strategy, Social Media, Meta Ads, Web Development, Landing Page Design, Poster Design, AI Chatbot Development',
                education: 'B.Tech – AI & Data Science, Ramco Institute'
              }
            ].map((member, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:scale-105 transition-all duration-300 ${isVisible['team'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-blue-300 font-semibold mb-3">{member.role}</p>
                <p className="text-blue-200 text-sm mb-3">{member.experience}</p>
                <p className="text-blue-100 text-sm mb-3"><span className="font-semibold">Expertise:</span> {member.expertise}</p>
                <p className="text-blue-200 text-sm"><span className="font-semibold">Education:</span> {member.education}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Featured Work</h2>
          <p className="text-blue-200 text-center mb-12">Explore our latest projects and creative accomplishments</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'VIDEO EDITING PORTFOLIO ',
                desc: 'Professional video editing projects showcasing cinematic storytelling, smooth transitions, and engaging visual effects',
                link: 'https://drive.google.com/drive/folders/15aYEnpyxbD5NR1BsDrjrPMb-iH77EBgM',
                type: 'portfolio'
              },
              {
                title: 'POSTER PORTFOLIO',
                desc: 'Creative poster designs for events, marketing, and branding with stunning visual impact',
                link: 'https://drive.google.com/drive/folders/1WvQaUk6UPOWPuqs_KBV1LATtggz3tkq6',
                type: 'portfolio'
              },
              {
                title: 'VAIGAI NAMMA TAXI WEBSITE',
                desc: 'Modern, responsive web application showcasing professional web development skills with clean design and smooth UX',
                link: 'https://vaigainammataxi.netlify.app',
                type: 'website'
              },
              {
                title: 'URS CHOICE – REAL ESTATE WEBSITE',
                desc: 'Modern real estate landing page with clean layout, clear CTAs, structured content, mobile-friendly, optimized for inquiries and trust',
                link: 'https://urs-choice-landing-page.vercel.app',
                type: 'website'
              },
              {
                title: '5 STAR - TASK MANAGEMENT',
                desc: 'Modern real estate landing page with clean layout, clear CTAs, structured content, mobile-friendly, optimized for inquiries and trust',
                link: 'https://urs-choice-landing-page.vercel.app',
                type: 'website'
              },
              {
                title: 'URS CHOICE – Real Estate Website',
                desc: 'Modern real estate landing page with clean layout, clear CTAs, structured content, mobile-friendly, optimized for inquiries and trust',
                link: 'https://urs-choice-landing-page.vercel.app',
                type: 'website'
              }
            ].map((project, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 hover:scale-105 hover:shadow-2xl transition-all duration-300 ${isVisible['portfolio'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-blue-200 mb-6">{project.desc}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg transition-all text-center"
                  >
                    {project.type === 'portfolio' ? 'View Portfolio' : 'View Website'}
                  </a>
                  <button
                    onClick={() => openWhatsApp(`Hi ARRlSE DIGITAL, I'd like to discuss a project similar to ${project.title}.`)}
                    className="px-6 py-3 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-full font-semibold hover:bg-white/30 transition-all text-center"
                  >
                    Discuss Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Let's Work Together</h2>
          <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-1000 ${isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <form
              onSubmit={handleFormSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-blue-200 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-blue-200 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="services" className="block text-blue-200 mb-2">Services Needed</label>
                <input
                  type="text"
                  id="services"
                  name="services"
                  required
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., Web Development, Graphic Design"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-blue-200 mb-2">Budget Range</label>
                <select
                  id="budget"
                  name="budget"
                  required
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="bg-slate-800">Select Budget Range</option>
                  <option value="Under ₹25,000" className="bg-slate-800">Under ₹25,000</option>
                  <option value="₹25,000 - ₹50,000" className="bg-slate-800">₹25,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000" className="bg-slate-800">₹50,000 - ₹1,00,000</option>
                  <option value="Above ₹1,00,000" className="bg-slate-800">Above ₹1,00,000</option>
                </select>
              </div>
              <div>
                <label htmlFor="requirements" className="block text-blue-200 mb-2">Project Requirements</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Send Message via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 backdrop-blur-md bg-white/5 border-t border-white/10">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">ARRlSE DIGITAL</h3>
          <p className="text-blue-200 mb-4">
            Contact: +91 73051 15192 | arrisedigital@gmail.com
          </p>
          <p className="text-blue-200 mb-6">Remote Control Agency, Madurai</p>
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://www.instagram.com/arrisedigital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white hover:scale-110 transition-all"
            >
              <Instagram size={28} />
            </a>
            <a
              href="mailto:arrisedigital@gmail.com"
              className="text-blue-300 hover:text-white hover:scale-110 transition-all"
            >
              <Mail size={28} />
            </a>
            <button
              onClick={() => openWhatsApp()}
              className="text-blue-300 hover:text-white hover:scale-110 transition-all"
            >
              <MessageCircle size={28} />
            </button>
          </div>
          <p className="text-blue-300 text-sm">
            © 2024 ARRlSE DIGITAL. All rights reserved.
          </p>
        </div>
      </footer>

      <button
        onClick={() => openWhatsApp()}
        className="fixed bottom-6 right-6 p-4 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all z-50 animate-bounce"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}

export default App;
