import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
  } from "@clerk/nextjs";
  import { Button } from "./ui/button";
  
  export function Navbar() {
    return (
      <div className="flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 bg-purple-500 text-white">
          {/* Logo */}
          <div className="flex items-center">
            <span className="flex items-center justify-center w-8 h-8 bg-white text-purple-500 rounded-full font-bold mr-2">
              R
            </span>
            <span className="text-xl font-bold">ReplyGuy</span>
          </div>
  
          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            <a href="#faq" className="font-medium hover:underline">
              FAQ
            </a>
            <a href="#pricing" className="font-medium hover:underline">
              Pricing
            </a>
            <a href="#blog" className="font-medium hover:underline">
              Blog
            </a>
          </nav>
  
          {/* Auth Button */}
          <div>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
              <SignedOut>
                <Button>
                  <SignInButton />
                </Button>
                <Button>
                  <SignUpButton />
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </div>
        </header>
  
        {/* Mobile Navigation (shown only on small screens) */}
        <div className="md:hidden flex justify-center gap-4 py-2 bg-purple-400 text-white">
          <a href="#faq" className="font-medium hover:underline">
            FAQ
          </a>
          <a href="#pricing" className="font-medium hover:underline">
            Pricing
          </a>
          <a href="#blog" className="font-medium hover:underline">
            Blog
          </a>
        </div>
      </div>
    );
  }
  