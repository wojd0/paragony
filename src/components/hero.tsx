import Link from 'next/link';

export default function Hero() {
   return (
      <div className="hero min-h-screen bg-base-400">
         <div className="hero-content text-center">
            <div className="max-w-md">
               <h1 className="text-5xl font-bold">
                  Paragonizator, paragonizer, paragoinator...
               </h1>
               <p className="py-6">Nie mam pomysłu na nazwę ☹️</p>
               <Link href="/scan">
                  <button className="btn btn-primary">Rozpocznij</button>
               </Link>
            </div>
         </div>
      </div>
   );
}
