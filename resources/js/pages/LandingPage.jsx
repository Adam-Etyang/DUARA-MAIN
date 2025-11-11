import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import { BarChart3, Calendar, CheckCircle, Search, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
    return (
        <>
            <Head title="Welcome to Duara" />
            {/* Import Google Font */}
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <div className="flex min-h-screen flex-col bg-white font-[Poppins] dark:bg-black">

                {/*  Navbar */}
                <nav className="flex items-center justify-between px-8 py-4 shadow-sm dark:bg-black bg-white">
                   <motion.div
  whileHover={{ scale: 1.1, rotate: 3, textShadow: "0 0 8px rgba(255, 223, 0, 0.8)" }}
  transition={{ type: 'spring', stiffness: 300 }}
  className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 cursor-pointer select-none"
>
  Duara<span className="text-yellow-300 dark:text-yellow-200">.</span>
</motion.div>


                  <div className="flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 250 }}>
    <Link href={route('login')} className="hover:text-yellow-500 dark:hover:text-yellow-400">
      Login
    </Link>
  </motion.div>
  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 250 }}>
    <Link href={route('register')} className="hover:text-yellow-500 dark:hover:text-yellow-400">
      Get Started
    </Link>
  </motion.div>
</div>
                </nav>

                {/* Hero Section */}
                <div
                    className="flex flex-col items-center justify-center bg-cover bg-center px-6 py-32 text-center"
                    style={{
                        backgroundImage: "url('/circlehand.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="bg-white/70 dark:bg-black/60 p-10 rounded-2xl backdrop-blur-md">
                        <motion.h1
  className="max-w-4xl text-5xl font-extrabold leading-tight text-yellow-500 dark:text-yellow-400 drop-shadow-md cursor-pointer"
  whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(255, 223, 0, 0.7)" }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Stop Searching. Start Connecting.
</motion.h1>

                       <p className="mt-6 max-w-2xl mx-auto text-center text-xl text-gray-700 dark:text-gray-300">
  Finding and joining student clubs shouldn’t feel like detective work.
  Duara makes it simple to discover, join, and grow with communities that match your vibe.
</p>

                        <div className="mt-8 flex gap-4 justify-center">
                            <Link href={route('register')}>
                                <Button
                                    size="lg"
                                    className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-transform hover:scale-105"
                                >
                                    Get Started
                                </Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-black text-black hover:bg-gray-100 dark:border-white dark:text-white dark:hover:bg-gray-900 transition-transform hover:scale-105"
                                >
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

               {/* ✅ Problem Section */}
<div className="bg-gray-50 px-6 py-16 dark:bg-gray-950">
  <div className="mx-auto max-w-6xl">
    <h2 className="mb-12 text-center text-3xl font-bold text-yellow-500 dark:text-yellow-400">
      The Problem We're Solving
    </h2>
    <div className="grid gap-8 md:grid-cols-3">
      <Card className="border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-black transition-transform hover:scale-105 hover:border-yellow-400 hover:shadow-lg">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
            <Search className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-yellow-500 dark:text-yellow-400">
            Manual & Disorganized
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Students rely on scattered posters and word-of-mouth to find clubs—wasting time and missing opportunities.
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-black transition-transform hover:scale-105 hover:border-yellow-400 hover:shadow-lg">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
            <Users className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-yellow-500 dark:text-yellow-400">
            No Central Platform
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            There’s no unified place to discover all available clubs or stay updated on their activities.
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-black transition-transform hover:scale-105 hover:border-yellow-400 hover:shadow-lg">
        <CardContent className="pt-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
            <BarChart3 className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-yellow-500 dark:text-yellow-400">
            Limited Management Tools
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Club leaders struggle to track membership and event participation without proper tools.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</div>

               {/* ✅ CTA Section */}
<div className="bg-gray-50 px-6 py-20 dark:bg-gray-950">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="mb-6 text-4xl font-bold text-yellow-500 dark:text-yellow-400">
      Ready to Get Involved?
    </h2>
    <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
      Join Duara today and discover clubs that match your interests.
    </p>
    <Link href={route('register')}>
      <Button
        size="lg"
        className="bg-black text-white hover:bg-yellow-500 dark:bg-white dark:text-black dark:hover:bg-yellow-400 transition-transform hover:scale-105"
      >
        Create Your Account
      </Button>
    </Link>
  </div>
</div>

{/* ✅ Footer */}
<footer className="bg-black text-white py-10 px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <h3 className="text-2xl font-bold mb-3 text-yellow-500 dark:text-yellow-400">
        Duara<span className="text-yellow-300 dark:text-yellow-200">.</span>
      </h3>
      <p className="text-gray-400">
        Connecting students to communities, ideas, and opportunities.
      </p>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-3 text-yellow-500 dark:text-yellow-400">Quick Links</h4>
      <ul className="space-y-2 text-gray-400">
        <li><Link href={route('register')} className="hover:text-yellow-500 dark:hover:text-yellow-400">Join Now</Link></li>
        <li><Link href={route('login')} className="hover:text-yellow-500 dark:hover:text-yellow-400">Login</Link></li>
        <li><Link href="#" className="hover:text-yellow-500 dark:hover:text-yellow-400">About</Link></li>
        <li><Link href="#" className="hover:text-yellow-500 dark:hover:text-yellow-400">Contact</Link></li>
      </ul>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-3 text-yellow-500 dark:text-yellow-400">Follow Us</h4>
      <div className="flex gap-4 text-gray-400">
        <a href="#" className="hover:text-yellow-500 dark:hover:text-yellow-400">Instagram</a>
        <a href="#" className="hover:text-yellow-500 dark:hover:text-yellow-400">Twitter</a>
        <a href="#" className="hover:text-yellow-500 dark:hover:text-yellow-400">LinkedIn</a>
      </div>
    </div>
  </div>
  <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} Duara. All rights reserved.
  </div>
</footer>

            </div>
        </>
    );
}
