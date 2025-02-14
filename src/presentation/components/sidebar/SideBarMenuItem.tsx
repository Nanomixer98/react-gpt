import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  icon: string;
  title: string;
  description: string;
}

export const SideBarMenuItem = ({ description, icon, title, to }: Props) => {
  return (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        `flex justify-center items-center rounded-md p-2 transition-colors hover:bg-gray-700 ${
          isActive ? 'bg-gray-800' : ''
        }`
      }
    >
      <i className={`${icon} text-2xl mr-4 text-indigo-400`} />
      <div className="flex flex-col flex-grow">
        <span className="text-lg text-white font-semibold">{title}</span>
        <span className="text-sm text-gray-400">{description}</span>
      </div>
    </NavLink>
  );
};
