"use client"
import { registerAction } from '@/app/actions/register';
import { User } from '@/types/User';
import { error } from 'console';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        dni: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = {
            name: formData.name,
            dni: formData.dni,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            gender: formData.gender,
            profilePicture: undefined,
            createdAt: undefined,
            id: undefined,
        };
        
        const result = await registerAction(user);
        if (!result.success && result.errors) {
            setErrors(result.errors);
            console.log(errors);
            return;
        }
        
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-400 text-gray-500 py-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors?.name && <p className="text-md text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={formData.dni}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors?.dni && <p className="text-md text-red-500">{errors.dni}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors?.email && <p className="text-md text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors?.password && <p className="text-md text-red-500">{errors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors?.phone && <p className="text-md text-red-500">{errors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};