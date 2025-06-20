"use client";

import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
    const skeletonArray = Array(6).fill(0);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skeletonArray.map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-96">
                    <Skeleton className="w-full h-60" />
                    <div className="p-6 flex-grow flex flex-col">
                        <Skeleton className="h-6 w-4/5 mx-auto mb-4" />
                        <Skeleton className="h-4 w-1/4 mb-4" />
                        <Skeleton className="h-16 w-full mb-4" />
                        <Skeleton className="h-4 w-1/4 ml-auto" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostCardSkeleton; 