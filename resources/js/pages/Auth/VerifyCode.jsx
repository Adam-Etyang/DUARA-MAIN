import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded shadow"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Enter Verification Code
          </h2>
          <Input
            name="two_factor_code"
            value={data.two_factor_code}
            onChange={(e) => setData("two_factor_code", e.target.value)}
            placeholder="6-digit code"
          />
          {errors.two_factor_code && (
            <p className="text-sm text-red-600 mt-1">{errors.two_factor_code}</p>
          )}
          <Button
            disabled={processing}
            type="submit"
            className="w-full mt-4"
          >
            {processing ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </div>
    </>
  );
}