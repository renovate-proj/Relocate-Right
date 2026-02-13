'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function AuthCodeErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                        Authentication Error
                    </h3>

                    <div className="text-sm text-gray-500 mb-6">
                        {error === 'clock_skew' ? (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left">
                                <p className="font-bold text-yellow-700">System Time Error</p>
                                <p className="text-yellow-600 mt-1">
                                    Your computer's time appears to be incorrect (behind the server time).
                                </p>
                                <p className="text-yellow-600 mt-2 font-semibold">
                                    Please synchronize your system clock and try again.
                                </p>
                            </div>
                        ) : (
                            <p>{error || 'There was an error signing you in. The verification link may be invalid or expired.'}</p>
                        )}
                    </div>

                    <div className="mt-6">
                        <Link
                            href="/login"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Back to Login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function AuthCodeError() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <AuthCodeErrorContent />
        </Suspense>
    );
}
