const ProfileSkeleton = () => {
    return (
      <div className="max-w-screen-xl mx-auto p-6 border rounded-md my-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-6">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-6 bg-gray-200 animate-pulse mb-2 mx-auto"></div>
                <div className="w-16 h-4 bg-gray-200 animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex items-center justify-start gap-4">
          <div className="w-24 h-8 rounded-md bg-gray-200 animate-pulse"></div>
          <div className="w-24 h-8 rounded-md bg-gray-200 animate-pulse"></div>
          </div>
        </div>
  
        <div className="text-center">
          <div className="w-32 h-6 bg-gray-200 animate-pulse mx-auto mb-2"></div>
          <div className="w-24 h-4 bg-gray-200 animate-pulse mx-auto mb-4"></div>
          <div className="flex justify-center space-x-4">
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
  
       
        <div className="text-center mt-6">
          <div className="w-40 h-4 bg-gray-200 animate-pulse mx-auto mb-2"></div>
          <div className="w-60 h-4 bg-gray-200 animate-pulse mx-auto"></div>
        </div>
  
        <div className="my-6 border-t border-gray-200"></div>
  
        <div>
          <div className="w-80 h-6 bg-gray-200 animate-pulse mx-auto mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="w-full h-4 bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileSkeleton;