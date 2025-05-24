// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from './components/ui/badge'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import logo from './assets/logo.webp'

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 60) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-100px 0px -100px 0px',
      threshold: 0.3
    })

    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => {
      observer.observe(section)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      sections.forEach(section => {
        observer.unobserve(section)
      })
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className='min-h-screen font-sans bg-white text-gray-800'>
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-md py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className='container mx-auto px-4 md:px-6 flex items-center justify-between'>
          <div className='flex items-center'>
            <a
              href='#home'
              className='text-2xl font-bold text-blue-600 flex justify-center items-center gap-2'
            >
              <img src={logo} alt='Ustozweb' className='w-20' />
              <span className='ml-[-20px]'>UstozWeb</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-6'>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-blue-600 cursor-pointer whitespace-nowrap ${
                  activeSection === item.id ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              variant='outline'
              className='!rounded-button whitespace-nowrap'
            >
              <i className='fas fa-moon mr-2'></i>
              Dark Mode
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden mr-5 hover:text-blue-600 cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i
              className={`fas ${
                mobileMenuOpen ? 'fa-times' : 'fa-bars'
              } text-xl`}
            ></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className='md:hidden bg-white shadow-lg absolute top-full left-0 right-0 border-t border-gray-100'>
            <div className='container mx-auto px-4 py-3 flex flex-col space-y-3'>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`py-2 text-sm font-medium transition-colors hover:text-blue-600 cursor-pointer ${
                    activeSection === item.id
                      ? 'text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                variant='outline'
                className='!rounded-button whitespace-nowrap'
              >
                <i className='fas fa-moon mr-2'></i>
                Dark Mode
              </Button>
            </div>
          </div>
        )}
      </header>
      <main>
        {/* Hero Section */}
        <section
          id='home'
          className='relative min-h-screen flex items-center pt-20 overflow-hidden'
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20tech%20abstract%20background%20with%20blue%20gradient%20and%20soft%20geometric%20shapes%2C%20professional%20clean%20design%20for%20tech%20company%20website%2C%20minimalist%20style%20with%20light%20elements%20and%20subtle%20pattern%2C%20high%20quality%20digital%20art&width=1440&height=800&seq=hero1&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-transparent'></div>
          <div className='container mx-auto px-4 md:px-6 relative z-10'>
            <div className='max-w-2xl'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6'>
                Get Your Website Ready{' '}
                <span className='text-blue-600'>in Days!</span>
              </h1>
              <p className='text-lg md:text-xl text-gray-700 mb-8'>
                Professional web development, online courses, and Telegram bot
                creation services to help your business grow in the digital
                world.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button className='!rounded-button whitespace-nowrap text-base px-8 py-6'>
                  <i className='fas fa-rocket mr-2'></i>
                  Start Project
                </Button>
                <Button
                  variant='outline'
                  className='!rounded-button whitespace-nowrap text-base px-8 py-6'
                >
                  <i className='fas fa-info-circle mr-2'></i>
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce'>
            <button
              onClick={() => scrollToSection('services')}
              className='text-blue-600 hover:text-blue-700 cursor-pointer'
            >
              <i className='fas fa-chevron-down text-2xl'></i>
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section id='services' className='py-20 bg-gray-50'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='text-center mb-16'>
              <Badge className='mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100'>
                Our Expertise
              </Badge>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Services We Offer
              </h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                We provide comprehensive IT solutions to help businesses and
                individuals establish a strong online presence and leverage
                digital technologies.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {[
                {
                  icon: 'fa-globe',
                  title: 'Website Creation',
                  description:
                    'Custom-designed responsive websites tailored to your brand and business needs.',
                  image:
                    'https://readdy.ai/api/search-image?query=Modern%20website%20design%20concept%20with%20clean%20interface%2C%20showing%20responsive%20layouts%20on%20different%20devices%2C%20professional%20web%20design%20visualization%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%203D%20render&width=600&height=400&seq=service1&orientation=landscape'
                },
                {
                  icon: 'fa-laptop-code',
                  title: 'Web App Development',
                  description:
                    'Powerful web applications with intuitive interfaces and robust functionality.',
                  image:
                    'https://readdy.ai/api/search-image?query=Web%20application%20development%20concept%20with%20code%20interface%2C%20dashboard%20elements%2C%20and%20user%20interface%20components%2C%20professional%20software%20development%20visualization%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%203D%20render&width=600&height=400&seq=service2&orientation=landscape'
                },
                {
                  icon: 'fa-robot',
                  title: 'Telegram Bots',
                  description:
                    'Custom Telegram bots to automate tasks and enhance user engagement.',
                  image:
                    'https://readdy.ai/api/search-image?query=Telegram%20bot%20concept%20with%20chat%20interface%20and%20automation%20elements%2C%20messaging%20app%20integration%20with%20AI%20features%2C%20professional%20software%20visualization%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%203D%20render&width=600&height=400&seq=service3&orientation=landscape'
                },
                {
                  icon: 'fa-graduation-cap',
                  title: 'Online Education',
                  description:
                    'Comprehensive online courses and learning materials for IT skills development.',
                  image:
                    'https://readdy.ai/api/search-image?query=Online%20education%20platform%20with%20learning%20interface%2C%20course%20materials%2C%20and%20virtual%20classroom%20elements%2C%20professional%20e-learning%20visualization%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%203D%20render&width=600&height=400&seq=service4&orientation=landscape'
                }
              ].map((service, index) => (
                <Card
                  key={index}
                  className='group overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow-sm'
                >
                  <div className='h-48 overflow-hidden'>
                    <img
                      src={service.image}
                      alt={service.title}
                      className='w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>
                  <CardContent className='p-6'>
                    <div className='w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4'>
                      <i className={`fa ${service.icon} text-xl`}></i>
                    </div>
                    <h3 className='text-xl font-bold mb-2'>{service.title}</h3>
                    <p className='text-gray-600 mb-4'>{service.description}</p>
                    <a
                      href='#'
                      className='text-blue-600 hover:text-blue-700 font-medium inline-flex items-center cursor-pointer'
                    >
                      Learn More
                      <i className='fas fa-arrow-right ml-2 text-sm transition-transform group-hover:translate-x-1'></i>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id='portfolio' className='py-20'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='text-center mb-16'>
              <Badge className='mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100'>
                Our Work
              </Badge>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Featured Projects
              </h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Explore our portfolio of successful projects that showcase our
                expertise and commitment to delivering exceptional digital
                solutions.
              </p>
            </div>

            <Tabs defaultValue='all' className='mb-12'>
              <div className='flex justify-center'>
                <TabsList>
                  <TabsTrigger
                    value='all'
                    className='!rounded-button whitespace-nowrap'
                  >
                    All Projects
                  </TabsTrigger>
                  <TabsTrigger
                    value='websites'
                    className='!rounded-button whitespace-nowrap'
                  >
                    Websites
                  </TabsTrigger>
                  <TabsTrigger
                    value='webapps'
                    className='!rounded-button whitespace-nowrap'
                  >
                    Web Apps
                  </TabsTrigger>
                  <TabsTrigger
                    value='bots'
                    className='!rounded-button whitespace-nowrap'
                  >
                    Telegram Bots
                  </TabsTrigger>
                  <TabsTrigger
                    value='education'
                    className='!rounded-button whitespace-nowrap'
                  >
                    Education
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value='all' className='mt-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {[
                    {
                      title: 'E-Commerce Platform',
                      category: 'Web App',
                      image:
                        'https://readdy.ai/api/search-image?query=Modern%20e-commerce%20website%20interface%20with%20product%20listings%2C%20shopping%20cart%2C%20and%20clean%20design%2C%20professional%20web%20design%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%20digital%20mockup&width=600&height=450&seq=portfolio1&orientation=landscape'
                    },
                    {
                      title: 'Corporate Website',
                      category: 'Website',
                      image:
                        'https://readdy.ai/api/search-image?query=Professional%20corporate%20website%20with%20clean%20layout%2C%20about%20us%20section%2C%20services%20showcase%2C%20and%20contact%20information%2C%20business%20web%20design%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%20digital%20mockup&width=600&height=450&seq=portfolio2&orientation=landscape'
                    },
                    {
                      title: 'Learning Management System',
                      category: 'Education',
                      image:
                        'https://readdy.ai/api/search-image?query=Online%20learning%20platform%20interface%20with%20course%20listings%2C%20student%20dashboard%2C%20and%20progress%20tracking%20features%2C%20educational%20web%20design%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%20digital%20mockup&width=600&height=450&seq=portfolio3&orientation=landscape'
                    },
                    {
                      title: 'Customer Support Bot',
                      category: 'Telegram Bot',
                      image:
                        'https://readdy.ai/api/search-image?query=Telegram%20bot%20interface%20for%20customer%20support%20with%20chat%20window%2C%20automated%20responses%2C%20and%20user-friendly%20design%2C%20messaging%20application%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%20digital%20mockup&width=600&height=450&seq=portfolio4&orientation=landscape'
                    },
                    {
                      title: 'Real Estate Portal',
                      category: 'Web App',
                      image:
                        'https://readdy.ai/api/search-image?query=Real%20estate%20website%20with%20property%20listings%2C%20search%20filters%2C%20and%20interactive%20map%2C%20professional%20web%20application%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%20digital%20mockup&width=600&height=450&seq=portfolio5&orientation=landscape'
                    },
                    {
                      title: 'Restaurant Website',
                      category: 'Website',
                      image:
                        'https://readdy.ai/api/search-image?query=Restaurant%20website%20with%20menu%20showcase%2C%20reservation%20system%2C%20and%20elegant%20design%2C%20food%20service%20web%20design%20with%20blue%20accent%20colors%20on%20light%20background%2C%20high%20quality%20digital%20mockup&width=600&height=450&seq=portfolio6&orientation=landscape'
                    }
                  ].map((project, index) => (
                    <Card
                      key={index}
                      className='group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300'
                    >
                      <div className='relative h-64 overflow-hidden'>
                        <img
                          src={project.image}
                          alt={project.title}
                          className='w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end'>
                          <div className='p-6 w-full'>
                            <Badge className='mb-2 bg-blue-600'>
                              {project.category}
                            </Badge>
                            <h3 className='text-xl font-bold text-white'>
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Other tabs would have similar content filtered by category */}
              <TabsContent value='websites' className='mt-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {/* Filtered content for websites */}
                </div>
              </TabsContent>

              {/* Repeat for other categories */}
            </Tabs>

            <div className='text-center'>
              <Button className='!rounded-button whitespace-nowrap'>
                <i className='fas fa-th-large mr-2'></i>
                View All Projects
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id='about' className='py-20 bg-gray-50'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div>
                <Badge className='mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100'>
                  About Us
                </Badge>
                <h2 className='text-3xl md:text-4xl font-bold mb-6'>
                  We Build Digital Solutions That Drive Growth
                </h2>
                <p className='text-gray-600 mb-6'>
                  UstozWeb is a leading IT service company specializing in web
                  development, online education, and Telegram bot creation.
                  Founded in 2018, we've been helping businesses and individuals
                  establish a strong online presence and leverage digital
                  technologies for growth.
                </p>
                <p className='text-gray-600 mb-8'>
                  Our team of experienced developers, designers, and educators
                  is committed to delivering high-quality solutions that meet
                  our clients' unique needs and exceed their expectations.
                </p>

                <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8'>
                  {[
                    { number: '200+', label: 'Projects Completed' },
                    { number: '50+', label: 'Happy Clients' },
                    { number: '15+', label: 'Team Members' },
                    { number: '5+', label: 'Years Experience' }
                  ].map((stat, index) => (
                    <div key={index} className='text-center'>
                      <p className='text-3xl font-bold text-blue-600'>
                        {stat.number}
                      </p>
                      <p className='text-sm text-gray-600'>{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Button className='!rounded-button whitespace-nowrap'>
                  <i className='fas fa-users mr-2'></i>
                  Meet Our Team
                </Button>
              </div>

              <div className='relative'>
                <div className='rounded-lg overflow-hidden shadow-xl'>
                  <img
                    src='https://readdy.ai/api/search-image?query=Professional%20diverse%20IT%20team%20working%20together%20in%20modern%20office%20environment%2C%20software%20developers%20and%20designers%20collaborating%20on%20digital%20projects%2C%20tech%20company%20workplace%20with%20blue%20color%20scheme%20and%20light%20background%2C%20high%20quality%20photorealistic%20render&width=800&height=600&seq=about1&orientation=landscape'
                    alt='UstozWeb Team'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg max-w-xs'>
                  <p className='text-lg font-medium italic'>
                    "Our mission is to empower businesses through innovative
                    digital solutions."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id='testimonials' className='py-20'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='text-center mb-16'>
              <Badge className='mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100'>
                Testimonials
              </Badge>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                What Our Clients Say
              </h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Don't just take our word for it. Here's what our clients have to
                say about their experience working with UstozWeb.
              </p>
            </div>

            <div className='max-w-5xl mx-auto'>
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 1
                  },
                  768: {
                    slidesPerView: 2
                  },
                  1024: {
                    slidesPerView: 2
                  }
                }}
                className='pb-12 '
              >
                {[
                  {
                    name: 'Sarah Johnson',
                    company: 'Fashion Boutique Owner',
                    image:
                      'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20smiling%20woman%20in%20business%20attire%20with%20light%20background%2C%20female%20entrepreneur%20portrait%20with%20natural%20lighting%20and%20soft%20focus%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial1&orientation=squarish',
                    quote:
                      'UstozWeb transformed our online presence with a beautiful e-commerce website. Our sales have increased by 40% since the launch!',
                    rating: 5
                  },
                  {
                    name: 'Michael Chen',
                    company: 'Tech Startup Founder',
                    image:
                      'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20smiling%20man%20in%20business%20casual%20attire%20with%20light%20background%2C%20male%20entrepreneur%20portrait%20with%20natural%20lighting%20and%20soft%20focus%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial2&orientation=squarish',
                    quote:
                      'The web application UstozWeb built for us has streamlined our operations and improved customer satisfaction. Highly recommended!',
                    rating: 5
                  },
                  {
                    name: 'Emma Davis',
                    company: 'Educational Consultant',
                    image:
                      'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20confident%20woman%20with%20glasses%20in%20business%20attire%20with%20light%20background%2C%20female%20education%20professional%20portrait%20with%20natural%20lighting%20and%20soft%20focus%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial3&orientation=squarish',
                    quote:
                      'The online learning platform developed by UstozWeb has revolutionized how we deliver courses. Our students love the intuitive interface!',
                    rating: 4
                  },
                  {
                    name: 'Alex Rodriguez',
                    company: 'Restaurant Owner',
                    image:
                      'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20smiling%20man%20in%20chef%20uniform%20with%20light%20background%2C%20male%20restaurant%20owner%20portrait%20with%20natural%20lighting%20and%20soft%20focus%2C%20high%20quality%20professional%20photography&width=200&height=200&seq=testimonial4&orientation=squarish',
                    quote:
                      'Our Telegram bot has significantly reduced the workload for our staff by automating reservations. UstozWeb delivered exactly what we needed.',
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <SwiperSlide key={index}>
                    <Card className='h-full border-0 shadow-md p-8 mb-10 relative'>
                      <div className='absolute top-6 right-6 text-blue-100'>
                        <i className='fas fa-quote-right text-5xl'></i>
                      </div>
                      <div className='flex items-center mb-4'>
                        <Avatar className='h-14 w-14 mr-4 border-2 border-blue-600'>
                          <AvatarImage
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className='font-bold'>{testimonial.name}</h4>
                          <p className='text-sm text-gray-600'>
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className='mb-4'>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${
                              i < testimonial.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            } mr-1`}
                          ></i>
                        ))}
                      </div>
                      <p className='text-gray-700 italic relative z-10'>
                        {testimonial.quote}
                      </p>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-20 bg-gray-50'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='text-center mb-16'>
              <Badge className='mb-3 bg-blue-100 text-blue-700 hover:bg-blue-100'>
                Get In Touch
              </Badge>
              <h2 className='text-3xl md:text-4xl font-bold mb-4'>
                Contact Us
              </h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Have a project in mind or want to learn more about our services?
                Reach out to us and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              <Card className='border-0 shadow-md overflow-hidden'>
                <div className='p-8'>
                  <h3 className='text-2xl font-bold mb-6'>Send Us a Message</h3>
                  <form className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label
                          htmlFor='name'
                          className='block text-sm font-medium text-gray-700 mb-1'
                        >
                          Full Name
                        </label>
                        <Input
                          id='name'
                          placeholder='John Doe'
                          className='w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium text-gray-700 mb-1'
                        >
                          Email Address
                        </label>
                        <Input
                          id='email'
                          type='email'
                          placeholder='john@example.com'
                          className='w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor='subject'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Subject
                      </label>
                      <Input
                        id='subject'
                        placeholder='How can we help you?'
                        className='w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='message'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Message
                      </label>
                      <Textarea
                        id='message'
                        placeholder='Tell us about your project...'
                        className='w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                        rows={5}
                      />
                    </div>
                    <Button className='w-full !rounded-button whitespace-nowrap'>
                      <i className='fas fa-paper-plane mr-2'></i>
                      Send Message
                    </Button>
                  </form>
                </div>
              </Card>

              <div>
                <Card className='border-0 shadow-md mb-8'>
                  <div className='p-8'>
                    <h3 className='text-2xl font-bold mb-6'>
                      Contact Information
                    </h3>
                    <div className='space-y-4'>
                      <div className='flex items-start'>
                        <div className='flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4'>
                          <i className='fas fa-map-marker-alt'></i>
                        </div>
                        <div>
                          <p className='font-medium'>Address</p>
                          <p className='text-gray-600'>
                            123 Tech Street, Digital City, 10001
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4'>
                          <i className='fas fa-envelope'></i>
                        </div>
                        <div>
                          <p className='font-medium'>Email</p>
                          <p className='text-gray-600'>info@ustozweb.com</p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4'>
                          <i className='fas fa-phone-alt'></i>
                        </div>
                        <div>
                          <p className='font-medium'>Phone</p>
                          <p className='text-gray-600'>+1 (555) 123-4567</p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4'>
                          <i className='fas fa-clock'></i>
                        </div>
                        <div>
                          <p className='font-medium'>Working Hours</p>
                          <p className='text-gray-600'>
                            Monday - Friday: 9:00 AM - 6:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className='border-0 shadow-md'>
                  <div className='p-8'>
                    <h3 className='text-2xl font-bold mb-6'>Connect With Us</h3>
                    <div className='flex space-x-4'>
                      {[
                        { icon: 'fa-facebook-f', color: 'bg-[#3b5998]' },
                        { icon: 'fa-twitter', color: 'bg-[#1da1f2]' },
                        { icon: 'fa-linkedin-in', color: 'bg-[#0077b5]' },
                        { icon: 'fa-instagram', color: 'bg-[#e1306c]' },
                        { icon: 'fa-telegram-plane', color: 'bg-[#0088cc]' }
                      ].map((social, index) => (
                        <a
                          key={index}
                          href='#'
                          className={`h-12 w-12 rounded-full ${social.color} text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer`}
                        >
                          <i className={`fab ${social.icon}`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className='bg-gray-900 text-white pt-16 pb-8'>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
            <div>
              <div className='flex items-center mb-6'>
                <img src={logo} alt='Ustzoweb' className='w-25' />
                <span className='text-2xl font-bold ml-[-20px]'>UstozWeb</span>
              </div>
              <p className='text-gray-400 mb-6'>
                Professional web development, online courses, and Telegram bot
                creation services to help your business grow in the digital
                world.
              </p>
              <div className='flex space-x-4'>
                {[
                  { icon: 'fa-facebook-f' },
                  { icon: 'fa-twitter' },
                  { icon: 'fa-linkedin-in' },
                  { icon: 'fa-instagram' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href='#'
                    className='h-10 w-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer'
                  >
                    <i className={`fab ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className='text-lg font-bold mb-6'>Quick Links</h4>
              <ul className='space-y-3'>
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Services', href: '#services' },
                  { label: 'Portfolio', href: '#portfolio' },
                  { label: 'About Us', href: '#about' },
                  { label: 'Testimonials', href: '#testimonials' },
                  { label: 'Contact', href: '#contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className='text-gray-400 hover:text-blue-500 transition-colors cursor-pointer'
                      onClick={e => {
                        e.preventDefault()
                        scrollToSection(link.href.substring(1))
                      }}
                    >
                      <i className='fas fa-chevron-right text-xs mr-2'></i>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='text-lg font-bold mb-6'>Our Services</h4>
              <ul className='space-y-3'>
                {[
                  { label: 'Website Creation', href: '#' },
                  { label: 'Web App Development', href: '#' },
                  { label: 'Telegram Bots', href: '#' },
                  { label: 'Online Education', href: '#' },
                  { label: 'UI/UX Design', href: '#' },
                  { label: 'SEO Optimization', href: '#' }
                ].map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className='text-gray-400 hover:text-blue-500 transition-colors cursor-pointer'
                    >
                      <i className='fas fa-chevron-right text-xs mr-2'></i>
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='text-lg font-bold mb-6'>Newsletter</h4>
              <p className='text-gray-400 mb-4'>
                Subscribe to our newsletter to receive updates on our latest
                services and offers.
              </p>
              <form className='space-y-3'>
                <Input
                  placeholder='Your Email Address'
                  className='w-full bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500'
                />
                <Button className='w-full !rounded-button whitespace-nowrap'>
                  <i className='fas fa-paper-plane mr-2'></i>
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className='pt-8 border-t border-gray-800 text-center'>
            <div className='flex flex-wrap justify-center gap-6 mb-6'>
              {[
                { icon: 'fab fa-cc-visa text-2xl' },
                { icon: 'fab fa-cc-mastercard text-2xl' },
                { icon: 'fab fa-cc-paypal text-2xl' },
                { icon: 'fab fa-cc-stripe text-2xl' }
              ].map((payment, index) => (
                <i key={index} className={`${payment.icon} text-gray-500`}></i>
              ))}
            </div>
            <p className='text-gray-500'>
              &copy; {new Date().getFullYear()} UstozWeb. All rights reserved. |
              Designed with <i className='fas fa-heart text-red-500'></i> by
              UstozWeb
            </p>
          </div>
        </div>
      </footer>
      {/* Back to Top Button */}
      {visible && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-6 right-6 h-12 w-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer animate-bounce'
        >
          <i className='fas fa-arrow-up'></i>
        </button>
      )}
    </div>
  )
}

export default App
