async function getMembers() {}

const Members = () => {
  return (
    <div>
      <h2>All Users</h2>
      <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        <li class="pb-3 sm:pb-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img
                class="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-1.jpg"
                alt="Neil image"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              $320
            </div>
          </div>
        </li>
        <li class="py-3 sm:py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img
                class="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="Neil image"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                Bonnie Green
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              $3467
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Members;
