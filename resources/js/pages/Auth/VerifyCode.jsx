import { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft } from "lucide-react";

export default function VerifyCode() {
  const { data, setData, post, processing, errors } = useForm({
    two_factor_code: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/verify");
  };

  return (
    <>
      <Head title="Verify Code" />
      <div className="min-h-screen flex bg-white dark:bg-black">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-50 dark:bg-gray-950 items-center justify-center p-12">
          <div className="max-w-md space-y-6">
            <div className="w-20 h-20 rounded-full bg-black dark:bg-white flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-white dark:text-black" />
            </div>
            <h1 className="text-5xl font-bold text-black dark:text-white">Security First</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We take your account security seriously. Two-factor authentication adds an extra layer of protection to keep your account safe.
            </p>
            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Check your authenticator app for the 6-digit code
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Codes expire after 30 seconds
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter the code to access your account
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Verification Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Back Button */}
            <Link href={route('login')}>
              <Button variant="ghost" className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 -ml-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </Link>

            {/* Mobile Shield Icon */}
            <div className="flex lg:hidden justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <Shield className="w-8 h-8 text-black dark:text-white" />
              </div>
            </div>

            {/* Header */}
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-black dark:text-white">Enter Verification Code</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="two_factor_code" className="text-black dark:text-white">
                  Verification Code
                </Label>
                <Input
                  id="two_factor_code"
                  name="two_factor_code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="6"
                  value={data.two_factor_code}
                  onChange={(e) => setData("two_factor_code", e.target.value.replace(/\D/g, ''))}
                  className="border-2 border-gray-200 dark:border-gray-800 focus:border-black dark:focus:border-white bg-white dark:bg-black text-black dark:text-white text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                  autoFocus
                  autoComplete="one-time-code"
                />
                {errors.two_factor_code && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.two_factor_code}</p>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong className="text-black dark:text-white">Tip:</strong> Open your authenticator app (like Google Authenticator or Authy) to find your current verification code.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={processing || data.two_factor_code.length !== 6}
                className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 h-11 disabled:opacity-50"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Verify & Continue
                  </span>
                )}
              </Button>

              {/* Help Section */}
              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Having trouble?
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                  <button
                    type="button"
                    className="text-sm text-black dark:text-white underline hover:no-underline"
                    onClick={() => window.location.reload()}
                  >
                    Resend code
                  </button>
                  <Link
                    href="/support"
                    className="text-sm text-black dark:text-white underline hover:no-underline"
                  >
                    Contact support
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}