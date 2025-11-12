import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DeleteUserForm from '../Profile/Partials/DeleteUserForm';
import UpdatePasswordForm from '../Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '../Profile/Partials/UpdateProfileInformationForm';
import { User, Lock, Shield, Trash2, CheckCircle, XCircle, ArrowLeft, LogOut } from 'lucide-react';

export default function Index({ user, mustVerifyEmail, status }) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <>
            <Head title="Account Management" />
            
            <main className="min-h-screen bg-white dark:bg-black">
                <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
                    {/* Back Button and Logout */}
                    <div className="flex justify-between items-center">
                        <Link href="/dashboard">
                            <Button 
                                variant="ghost" 
                                className="text-black dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 transition-colors duration-200 -ml-4"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <Button 
                            onClick={handleLogout}
                            variant="outline"
                            className="border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-500 transition-colors duration-200"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>

                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-yellow-500 dark:text-yellow-400">
                            Account Settings
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your account information, security settings, and preferences
                        </p>
                    </div>

                    {/* Status Message */}
                    {status && (
                        <div className="bg-gray-100 dark:bg-gray-900 border-l-4 border-yellow-500 text-black dark:text-white p-4 rounded">
                            {status}
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            <Tabs defaultValue="profile" className="space-y-6">
                                <TabsList className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                                    <TabsTrigger value="profile" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black dark:data-[state=active]:bg-yellow-500 dark:data-[state=active]:text-white">
                                        Profile
                                    </TabsTrigger>
                                    <TabsTrigger value="security" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black dark:data-[state=active]:bg-yellow-500 dark:data-[state=active]:text-white">
                                        Security
                                    </TabsTrigger>
                                    <TabsTrigger value="danger" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black dark:data-[state=active]:bg-yellow-500 dark:data-[state=active]:text-white">
                                        Danger Zone
                                    </TabsTrigger>
                                </TabsList>

                                {/* Profile Tab */}
                                <TabsContent value="profile" className="space-y-6">
                                    <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-yellow-500 dark:text-yellow-400">
                                                <User className="w-5 h-5" />
                                                Profile Information
                                            </CardTitle>
                                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                                Update your account's profile information and email address
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <UpdateProfileInformationForm
                                                mustVerifyEmail={mustVerifyEmail}
                                                status={status}
                                            />
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Security Tab */}
                                <TabsContent value="security" className="space-y-6">
                                    <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-yellow-500 dark:text-yellow-400">
                                                <Lock className="w-5 h-5" />
                                                Update Password
                                            </CardTitle>
                                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                                Ensure your account is using a long, random password to stay secure
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <UpdatePasswordForm />
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                {/* Danger Zone Tab */}
                                <TabsContent value="danger" className="space-y-6">
                                    <Card className="border-2 border-red-200 dark:border-red-900 bg-white dark:bg-black">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                                <Trash2 className="w-5 h-5" />
                                                Delete Account
                                            </CardTitle>
                                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                                Permanently delete your account and all associated data
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <DeleteUserForm />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Sidebar - Account Overview */}
                        <div className="space-y-6">
                            <Card className="border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
                                <CardHeader>
                                    <CardTitle className="text-yellow-500 dark:text-yellow-400">Account Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                                            <User className="w-6 h-6 text-black dark:text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-black dark:text-white">{user.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                                        </div>
                                    </div>

                                    <Separator className="bg-gray-200 dark:bg-gray-800" />

                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Email Status</p>
                                        {user.email_verified_at ? (
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                                <span className="text-sm font-medium text-black dark:text-white">Verified</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                                <span className="text-sm font-medium text-black dark:text-white">Not Verified</span>
                                            </div>
                                        )}
                                    </div>

                                    {user.created_at && (
                                        <>
                                            <Separator className="bg-gray-200 dark:bg-gray-800" />
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Member Since</p>
                                                <p className="font-medium text-black dark:text-white">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Security Info Card */}
                            <Card className="border-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-yellow-500 dark:text-yellow-400 text-sm">
                                        <Shield className="w-4 h-4" />
                                        Security Tips
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-1.5"></div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Use a strong, unique password
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-1.5"></div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Keep your email verified
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-1.5"></div>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Update your password regularly
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
