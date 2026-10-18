import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseId = resolvedParams.id;

  const supabase = await createClient();

  // جلب تفاصيل الكورس من Supabase
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .maybeSingle();

  if (error || !course) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-[#020204] text-white selection:bg-[#00FF88] selection:text-black overflow-x-hidden font-sans" dir="rtl">
      
      {/* خلفية شبكية سايبربانك كبرى */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a12_1px,transparent_1px),linear-gradient(to_bottom,#0a0a12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 opacity-35" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020204_85%)] pointer-events-none z-0" />

      {/* Navbar القيادة والسيطرة العلوي */}
      <nav className="w-full flex justify-between items-center px-6 md:px-16 py-5 border-b border-[#00FF88]/20 bg-black/80 backdrop-blur-2xl sticky top-0 z-50 font-mono">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-black tracking-widest text-white flex items-center gap-2">
            DERA<span className="text-[#00FF88] drop-shadow-[0_0_15px_#00FF88]">3</span>
            <span className="text-[10px] text-gray-500 font-normal">.WARFARE</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xs font-mono text-gray-400 hover:text-[#00FF88] transition-colors flex items-center gap-2">
            <span>&larr;</span> العودة للرئيسية
          </Link>
        </div>
      </nav>

      {/* محتوى صفحة الكورس الرئيسي */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* العمود الأيمن والأوسط: التفاصيل والمحتوى */}
          <div className="lg:col-span-2 space-y-10">
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border border-[#00FF88]/30 bg-[#00FF88]/5 text-[#00FF88] text-xs font-mono shadow-[0_0_15px_rgba(0,255,136,0.1)]">
                <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
                MODULE ID: #{course.id.slice(0, 8).toUpperCase()}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-mono">
                [ SECURE SANDBOX READY ]
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
              {course.title}
            </h1>

            {/* وصف الكورس */}
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-mono bg-[#07070b] p-8 rounded-3xl border border-[#1a1a26] shadow-xl">
              {course.description || "هذا الكورس مصمم خصيصاً ليأخذك من الصفر وحتى الاحتراف بخطوات عملية ومباشرة داخل بيئة معزولة."}
            </p>

            {/* صورة الكورس بمعايير سينمائية */}
            <div className="relative h-72 md:h-[420px] w-full rounded-3xl overflow-hidden border border-[#00FF88]/30 bg-black shadow-[0_0_50px_rgba(0,255,136,0.2)] group">
              <img
                src={course.image_url || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"}
                alt={course.title}
                className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-transparent opacity-90" />
            </div>

            {/* محتوى الكورس التفصيلي المستخرج من قاعدة البيانات */}
            {course.content && (
              <div className="bg-[#07070b] border border-[#1a1a26] rounded-3xl p-8 space-y-4 shadow-xl">
                <h3 className="text-xl font-black text-white flex items-center gap-3 font-mono">
                  <span className="text-[#00FF88]">&gt;</span> التفاصيل الفنية للمنهج:
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed font-mono whitespace-pre-line">
                  {course.content}
                </p>
              </div>
            )}

            {/* ماذا ستتعلم (نقاط التعلم المضافة من الأدمن) */}
            {course.learn_points && course.learn_points.length > 0 && (
              <div className="bg-[#07070b] border border-[#1a1a26] rounded-3xl p-8 space-y-6 shadow-xl">
                <h3 className="text-xl font-black text-white flex items-center gap-3 font-mono">
                  <span className="text-[#00FF88]">&gt;</span> مهارات سوف تكتسبها فور الانتهاء:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learn_points.map((point: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-black/60 border border-[#1f1f2e] font-mono text-xs text-gray-300">
                      <span className="text-[#00FF88] font-bold">[✓]</span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* العمود الأيسر: صندوق السعر وزر الشراء المتطور (Sticky) */}
          <div className="lg:col-span-1 sticky top-28">
            <div className="bg-[#07070b] border border-[#00FF88]/40 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,255,136,0.18)] relative overflow-hidden space-y-8">
              
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00FF88]/10 rounded-full blur-3xl pointer-events-none" />

              {/* سعر الكورس */}
              <div className="flex justify-between items-center border-b border-[#1a1a26] pb-6 font-mono">
                <span className="text-gray-400 text-xs tracking-wider">سعر الكورس:</span>
                <span className="text-3xl font-black text-[#00FF88] drop-shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                  {course.is_free ? "مجاني" : `${course.price} ج.م`}
                </span>
              </div>

              {/* مميزات سريعة */}
              <div className="space-y-4 font-mono text-xs text-gray-400">
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-[#1a1a26]">
                  <span>مدة الوصول:</span>
                  <span className="text-white font-bold">صلاحية مدى الحياة</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-[#1a1a26]">
                  <span>نوع المحتوى:</span>
                  <span className="text-white font-bold">فيديوهات ومعامل عملية</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-[#1a1a26]">
                  <span>الدعم الفني:</span>
                  <span className="text-[#00FF88] font-bold">مباشر عبر الواتساب</span>
                </div>
              </div>

              {/* زر طلب الكورس عبر الواتساب */}
              <a
                href={`https://wa.me/${course.whatsapp_number || '201012345678'}?text=أريد طلب كورس: ${encodeURIComponent(course.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-[#00FF88] text-black font-black py-4.5 rounded-2xl hover:bg-[#00cc6a] hover:scale-[1.02] transition-all shadow-[0_0_35px_rgba(0,255,136,0.45)] text-sm font-mono tracking-wider cursor-pointer"
              >
                اطلب الكورس الان 🚀
              </a>

              <div className="p-4 rounded-2xl bg-black/50 border border-[#1a1a26] text-[11px] text-gray-400 font-mono text-center leading-relaxed">
                [!] يتم تأكيد الطلب وتفعيل صلاحية الدخول فوراً من خلال فريق الدعم عبر الواتساب.
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* Footer السفلي المتطور */}
      <footer className="py-12 px-6 md:px-16 border-t border-[#00FF88]/20 bg-black text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-6 font-mono mt-24">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-[#00FF88] rounded-full animate-ping" />
          <span className="text-white font-bold tracking-widest">DERA3 SECURITY PLATFORM</span>
        </div>
        <p className="text-gray-400">DERA3 CORE SYSTEMS ONLINE // SECURE CONNECTION</p>
      </footer>

    </div>
  );
}