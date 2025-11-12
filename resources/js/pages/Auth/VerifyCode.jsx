import { useState } from "react";
import { Head, useForm, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Mail } from "lucide-react";

export default function VerifyCode({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    two_factor_code: "",
  });

  const [resending, setResending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/verify");
  };

  const handleResend = () => {
    setResending(true);
    router.post('/verify/resend', {}, {
      preserveScroll: true,
      onFinish: () => setResending(false)
    });
  };

  return (
    <>
      <Head title="Verify Code" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="min-h-screen flex font-[Poppins] bg-white dark:bg-black">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gray-50 dark:bg-gray-950 bg-cover bg-center"
             style={{ backgroundImage: "url('/2handstogether.jpg')" }}
        >
          <div className="max-w-md space-y-6 bg-black/30 p-6 rounded-md">
            <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-yellow-500">Email Verification</h1>
            <p className="text-xl text-gray-100">
              We've sent a 6-digit verification code to your email. Enter it below to verify your account and get started.
            </p>
            <div className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <p className="text-gray-100">Check your email inbox for the code</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <p className="text-gray-100">Code expires in 10 minutes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                <p className="text-gray-100">Didn't receive it? You can resend</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Verification Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Back Button */}
            <Link href={route('login')}>
              <Button variant="ghost" className="text-black dark:text-white hover:bg-yellow-100 dark:hover:bg-yellow-900 -ml-4 transition-colors">
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
              <h2 className="text-3xl font-bold text-yellow-500">Enter Verification Code</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Check your email for the 6-digit verification code
              </p>
            </div>

            {/* Status Message */}
            {status && (
              <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-yellow-500 text-black dark:text-white p-4 rounded text-sm">
                {status}
              </div>
            )}

            {/* Verification Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="two_factor_code" className="text-yellow-500">
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
                  className="border-2 border-gray-200 dark:border-gray-800 focus:border-yellow-500 dark:focus:border-yellow-400 bg-white dark:bg-black text-black dark:text-white text-center text-2xl font-mono tracking-widest"
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
                  <strong className="text-black dark:text-white">Tip:</strong> Check your email inbox for the verification code. The code expires in 10 minutes.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={processing || data.two_factor_code.length !== 6}
                className="w-full bg-black text-white hover:bg-yellow-500 dark:bg-white dark:text-black dark:hover:bg-yellow-400 h-11 transition-transform hover:scale-105 disabled:opacity-50"
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

              {/* Resend Code */}
              <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResend}
                  disabled={resending}
                  className="border-2 border-gray-200 dark:border-gray-800 text-black dark:text-white hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-colors"
                >
                  {resending ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Resend Code
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
