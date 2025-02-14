import { menuRoutes } from '../../router';
import { SideBarMenuItem } from './SideBarMenuItem';

export const SideBarMenu = () => {
  return (
    <nav className="hidden sm:flex flex-col ml-5 w-[370px] min-h-[calc(100vh-3.0rem)] bg-white/10 p-5 rounded-3x max-h-100 overflow-auto no-scrollbar">
      <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
        ReactGPT<span className="text-indigo-500">.</span>
      </h1>
      <span className="text-xl">Bienvenido</span>

      <div className="border-gray-700 border my-3 overflow-y-auto" />
      {menuRoutes.map((route) => (
        <SideBarMenuItem key={route.to} {...route} />
      ))}
    </nav>
  );
};
