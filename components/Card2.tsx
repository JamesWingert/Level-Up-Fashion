/* This example requires Tailwind CSS v2.0+ */

export const Card = ({ imageUrl, url, title, category, description, id }) => {
  return (
    <ul role="list" className="">
      <li
        key={id}
        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      >
        <div className="flex-1 flex-col">
          <img
            className="mx-auto h-80 w-80  shrink-0 rounded-t-lg"
            src={imageUrl}
            alt=""
          />
          <h3 className="mt-6 text-sm font-medium text-gray-900">{title}</h3>
          <dl className="mt-1 flex grow flex-col justify-between">
            <dt className="sr-only">Description</dt>
            <dd className="text-sm text-gray-500">{description}</dd>
            <dt className="sr-only">Role</dt>
            <dd className="my-3">
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {category}
              </span>
            </dd>
          </dl>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <a
                href={url}
                className="relative z-50 -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                {/* removes https from url */}
                {url.replace(/(^\w+:|^)\/\//, '')}
                <span className="ml-3">
                  {' '}
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};
