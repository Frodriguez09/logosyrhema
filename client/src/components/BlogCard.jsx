import {Link } from 'react-router-dom';

export default function BlogCard({post}) {
    return (
        <Link
            to={`/blog/${post.slug}`}
            className='group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'
        >
            <div className='relative h-48 overflow-hidden'>
                <img src={post.image || 'https://via.placeholder.com/400x300'} 
                alt={post.title} 
                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute top-4 left-4'>
                    <span className='px-3 py-1 bg-blue-600 text-white text-sm rounded-full'>
                        {post.category}
                    </span>
                </div>
            </div>

            <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
                    {post.title}
                </h3>
                <p className='text-gray-600 mb-4 line-clamp-2'>
                    {post.content.substring(0, 150)}...
                </p>
                <div className='flex items-center justify-between text-sm text-gray-500'>
                    <span>{new Date(post.createdAt).toLocaleDateString('es-MX')}</span>
                    <span>{post.views} vistas</span>
                </div>
            </div>
        </Link>
    );
}