import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'SOMM100 · Learn, Taste, Explore',description:'葡萄酒与侍酒师的学习、品鉴和探索。SOMM100、CMS、品鉴笔记、题库、地图与视频频道。',manifest:'/manifest.webmanifest',icons:{icon:'/favicon.svg?v=4',apple:'/icon-192.png?v=4'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
