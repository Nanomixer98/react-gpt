import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import {
  AssistantPage,
  AudioToTextPage,
  ImageGenerationPage,
  ImageToTextPage,
  ImageTunningPage,
  OrthographyPage,
  ProsConsPage,
  ProsConsStreamPage,
  TextToAudioPage,
  TranslatePage,
} from '../pages';

export const menuRoutes = [
  {
    to: '/orthography',
    icon: 'fa-solid fa-spell-check',
    title: 'Ortografía',
    description: 'Corregir ortografía',
    component: <OrthographyPage />,
  },
  {
    to: '/pros-cons',
    icon: 'fa-solid fa-code-compare',
    title: 'Pros & Cons',
    description: 'Comparar pros y contras',
    component: <ProsConsPage />,
  },
  {
    to: '/pros-cons-stream',
    icon: 'fa-solid fa-water',
    title: 'Como stream',
    description: 'Con stream de mensajes',
    component: <ProsConsStreamPage />,
  },
  {
    to: '/translate',
    icon: 'fa-solid fa-language',
    title: 'Traducir',
    description: 'Textos a otros idiomas',
    component: <TranslatePage />,
  },
  {
    to: '/text-to-audio',
    icon: 'fa-solid fa-podcast',
    title: 'Texto a audio',
    description: 'Convertir texto a audio',
    component: <TextToAudioPage />,
  },
  {
    to: '/audio-to-text',
    icon: 'fa-solid fa-comment-dots',
    title: 'Audio a texto',
    description: 'Convertir audio a texto',
    component: <AudioToTextPage />,
  },
  {
    to: '/image-to-text',
    icon: 'fa-solid fa-x-ray',
    title: 'Imágen a texto',
    description: 'Explicar una imagen en texto',
    component: <ImageToTextPage />,
  },
  {
    to: '/image-generation',
    icon: 'fa-solid fa-image',
    title: 'Imágenes',
    description: 'Generar imágenes',
    component: <ImageGenerationPage />,
  },
  {
    to: '/image-tunning',
    icon: 'fa-solid fa-wand-magic',
    title: 'Editar imagen',
    description: 'Generación continua',
    component: <ImageTunningPage />,
  },
  {
    to: '/assistant',
    icon: 'fa-solid fa-user',
    title: 'Asistente',
    description: 'Información del asistente',
    component: <AssistantPage />,
  },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
        icon: route.icon,
        title: route.title,
        description: route.description,
      })),
      {
        path: '',
        element: <Navigate to={menuRoutes.at(0)!.to} />,
      },
    ],
  },
]);
