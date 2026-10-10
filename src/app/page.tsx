import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 py-8 sm:px-10">
      <header className="flex flex-wrap items-center justify-between gap-6 border-b pb-6">
        <a href="#home" className="text-xl font-bold">گروه اردیبهشت</a>
        <nav aria-label="ناوبری اصلی" className="flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-primary">درباره ما</a>
          <Button asChild variant="outline"><a href="#welcome">آشنایی با اردیبهشت</a></Button>
        </nav>
      </header>
      <main id="home" className="flex flex-1 flex-col justify-center gap-12 py-12">
        <section id="welcome" className="flex max-w-3xl flex-col items-start gap-6">
          <Badge variant="secondary">Ordibehesht-Group</Badge>
          <h1 className="text-4xl font-bold leading-relaxed sm:text-6xl">به گروه اردیبهشت خوش آمدید</h1>
          <p className="max-w-2xl text-lg leading-9 text-muted-foreground">آغاز یک مسیر تازه، با نگاهی به فردا.</p>
          <Button asChild size="lg"><a href="#about">بیشتر بدانید</a></Button>
        </section>
        <Card id="about" className="max-w-2xl">
          <CardHeader>
            <CardTitle><h2>درباره گروه اردیبهشت</h2></CardTitle>
            <CardDescription>Ordibehesht-Group</CardDescription>
          </CardHeader>
          <CardContent><p className="leading-8">وب‌سایت گروه اردیبهشت در حال آماده‌سازی است. به‌زودی اطلاعات بیشتری درباره ما در این صفحه قرار خواهد گرفت.</p></CardContent>
          <CardFooter><Badge variant="outline">به‌زودی</Badge></CardFooter>
        </Card>
      </main>
      <footer className="border-t py-6 text-sm text-muted-foreground">گروه اردیبهشت · Ordibehesht-Group</footer>
    </div>
  );
}
