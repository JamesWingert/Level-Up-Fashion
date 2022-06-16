import Link from 'next/link';

export const Card = ({
  href,
  imageUrl,
  url,
  title,
  category,
  description,
  id,
}) => {
  return (
    <ul role="list" className="">
      <li
        key={id}
        className="flex flex-col col-span-1 text-center bg-white rounded-lg divide-y divide-gray-200 shadow"
      >
        <div className="flex-col flex-1">
          <Link href={`/post/${href}`} passHref>
            <a className="hover:opacity-60">
              <img
                className="shrink-0 mx-auto w-80  h-80 rounded-t-lg"
                src={imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {title}
              </h3>
              <dl className="flex flex-col grow justify-between mt-1">
                <dt className="sr-only">Description</dt>
                <dd className="text-sm text-gray-500">{description}</dd>
                <dt className="sr-only">Role</dt>
                <dd className="my-3">
                  <span className="py-1 px-2 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                    {category}
                  </span>
                </dd>
              </dl>
            </a>
          </Link>
        </div>
        <div>
          <div className="flex -mt-px divide-x divide-gray-200">
            <div className="flex flex-1 w-0">
              <a
                href={url}
                className="inline-flex relative z-50 flex-1 justify-center items-center py-4 -mr-px w-0 text-sm font-medium rounded-bl-lg border border-transparent text-primary-focus hover:text-primary"
              >
                {/* removes https from url */}
                {url.replace(/(^\w+:|^)\/\//, '')}
                <span className="ml-3">
                  {' '}
                  <svg
                    className="w-6 h-6"
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
