import { Outlet } from 'react-router-dom';
import { SideBarMenu } from '../components';

export const DashboardLayout = () => {
  return (
    <main className="flex flex-row mt-7">
      <SideBarMenu />

      <section className="mx-3 sm:mx-5 flex flex-col w-full h-[calc(100vh-50px)] bg-white/10 p-5 rounded-3xl">
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-1">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};
