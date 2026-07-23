import { Link } from "react-router-dom";
import { img as textileImages } from "@/pages/AboutUs";
import { api } from "@/lib/api";
import { useApi } from "@/hooks/useApi";
import type { Service } from "@/types/api";

export default function Services() {
  const { data, loading, error } = useApi(
    () => api.getAll<Service>("services", { status: "visible", per_page: 100 }),
    [],
  );
  const services = data?.data ?? [];

  return <main style={{ background: "#fafaf8", minHeight: "100vh", color: "#1a1814" }}>
    <section className="max-w-7xl mx-auto px-6 py-20 text-center">
      <span className="text-xs tracking-[.18em] font-bold text-amber-800">WHAT WE OFFER</span>
      <h1 className="mt-4 text-4xl md:text-5xl font-semibold font-serif">Services Built Around Your Project</h1>
      <p className="max-w-2xl mx-auto mt-5 text-sm leading-7 text-stone-600">Explore ANC’s currently available services. Every service shown here is managed directly from the dashboard.</p>
    </section>

    <section className="max-w-7xl mx-auto px-6 pb-24">
      {loading && <p role="status">Loading services…</p>}
      {error && <p role="alert" className="text-red-700">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => <article className="bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col" key={service.id}>
          <img className="w-full h-56 object-cover" src={service.image_path ?? textileImages.swatches} alt={service.title} />
          <div className="p-7 flex flex-col grow">
            <span className="text-[10px] tracking-[.14em] font-bold text-amber-800">{(service.type ?? "SERVICE").toUpperCase()}</span>
            <h2 className="mt-3 text-xl font-semibold">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600 grow">{service.description}</p>
            {service.tags && service.tags.length > 0 && <div className="flex flex-wrap gap-2 mt-5">{service.tags.map((tag) => <span className="px-2 py-1 bg-stone-100 rounded text-[10px]" key={tag}>{tag}</span>)}</div>}
            {service.cta_url?.startsWith("http") ? <a className="mt-7 py-3 text-center text-xs font-bold tracking-wider text-white bg-stone-900" href={service.cta_url} target="_blank" rel="noreferrer">{service.cta_label ?? "LEARN MORE"}</a> : <Link className="mt-7 py-3 text-center text-xs font-bold tracking-wider text-white bg-stone-900" to={service.cta_url || "/contact"}>{service.cta_label ?? "INQUIRE NOW"}</Link>}
          </div>
        </article>)}
      </div>
      {!loading && !error && services.length === 0 && <p className="text-center text-stone-600">No services are currently published.</p>}
    </section>

    <section className="bg-stone-900 text-white text-center px-6 py-16">
      <h2 className="text-3xl font-serif">Need a tailored recommendation?</h2>
      <p className="mt-4 text-sm text-stone-300">Tell our Sharjah team about your project and we’ll guide you to the right service.</p>
      <Link className="inline-block mt-7 px-8 py-3 bg-amber-700 text-xs font-bold tracking-wider" to="/contact">CONTACT OUR TEAM</Link>
    </section>
  </main>;
}
