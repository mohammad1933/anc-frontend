// @ts-nocheck
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, errorMessage, type ApiResource, type PaginatedResponse } from "@/lib/api";
import "./Workspace.css";
import "./WorkspaceEnhancements.css";

type Project={id:number;name:string;client:string;description?:string;cover_image:string;status:string;is_favorite:boolean;fabrics:any[];fabrics_count:number;palette:any[];inspiration_images:string[];members:any[];timeline:any[];recent_activity:any[];updated_human:string};
type Favorite={id:number;favorite_folder_id:number|null;name:string;collection:string;material:string;image_url:string;colors:string[]};
type ColorFavorite={id:number;name:string;code:string;hex_code?:string;swatch_path?:string;catalog?:{id:number;name:string}};
type Folder={id:number;name:string;favorites_count:number};
const unwrap=<T,>(response:ApiResource<T>)=>response.data;

export function Projects(){
  const navigate=useNavigate();
  const [projects,setProjects]=useState<Project[]>([]);
  const [error,setError]=useState("");
  const [search,setSearch]=useState("");
  const [creating,setCreating]=useState(false);
  const [saving,setSaving]=useState(false);
  const [form,setForm]=useState({name:"",client:"",description:"",status:"active"});
  useEffect(()=>{api.getAll<Project>("projects",{per_page:100}).then(r=>setProjects(r.data)).catch(e=>setError(errorMessage(e)))},[]);
  const shown=projects.filter(p=>(p.name+p.client).toLowerCase().includes(search.toLowerCase()));
  const createProject=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);setError("");try{const response=await api.post<ApiResource<Project>>("projects",form);navigate(`/projects/${response.data.id}`)}catch(requestError){setError(errorMessage(requestError))}finally{setSaving(false)}};
  return <main className="workspace">
    <header className="workspace-head"><div><h1>Your Project Gallery</h1><p>Manage your textile specifications and moodboards for active client engagements.</p></div><div className="workspace-head-actions"><input aria-label="Search projects" placeholder="Search projects…" value={search} onChange={e=>setSearch(e.target.value)}/><button className="primary" type="button" onClick={()=>setCreating(!creating)}>+ New Project</button></div></header>
    {creating&&<form className="workspace-create" onSubmit={createProject}><h2>Create New Project</h2><div><label>PROJECT NAME<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>CLIENT<input required value={form.client} onChange={e=>setForm({...form,client:e.target.value})}/></label><label>STATUS<select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option value="active">Active</option><option value="in_review">In Review</option><option value="completed">Completed</option></select></label></div><label>DESCRIPTION<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label><footer><button type="button" onClick={()=>setCreating(false)}>Cancel</button><button className="primary" disabled={saving}>{saving?"Creating…":"Create Project"}</button></footer></form>}
    {error&&<p className="workspace-state" role="alert">{error}</p>}
    {!error&&shown.length===0&&<p className="workspace-state">{search?"No projects match your search.":"You have no projects yet. Create your first project to begin."}</p>}
    <section className="project-grid">{shown.map(p=><article className="project-card" key={p.id}><Link to={`/projects/${p.id}`}><div className="project-card-img">{p.cover_image?<img src={p.cover_image} alt=""/>:<div className="project-placeholder">ANC</div>}<span>{p.status.replace("_"," ").toUpperCase()}</span></div><div className="project-card-copy"><h2>{p.name}</h2><p>Client: {p.client}</p><footer><span>{p.fabrics_count} Fabrics Saved</span><span>{p.updated_human}</span></footer></div></Link></article>)}</section>
  </main>
}

export function ProjectDetails(){const {projectId}=useParams();const navigate=useNavigate();const [project,setProject]=useState<Project>();const [error,setError]=useState("");const load=()=>api.get<ApiResource<Project>>(`projects/${projectId}`).then(r=>setProject(unwrap(r))).catch(e=>setError(errorMessage(e)));useEffect(load,[projectId]);const action=async(path:string,method:"post"|"patch")=>{await api[method]<ApiResource<Project>>(path,{});load()};if(error)return <main className="workspace workspace-state">{error}</main>;if(!project)return <main className="workspace workspace-state">Loading project…</main>;return <main className="workspace"><div className="project-detail-head"><div><Link to="/projects">Projects</Link><h1>{project.name}</h1><p>{project.description}</p></div><div className="project-detail-actions"><button onClick={()=>navigator.share?.({title:project.name,url:location.href})}>Share</button><button onClick={()=>action(`projects/${project.id}/duplicate`,"post")}>Duplicate</button><button onClick={()=>action(`projects/${project.id}/archive`,"patch")}>Archive</button><button onClick={async()=>{if(confirm("Delete this project?")){await api.delete(`projects/${project.id}`);navigate("/projects")}}}>Delete</button></div></div><div className="project-detail-layout"><div><section className="workspace-section"><h2>Saved Fabrics</h2><div className="fabric-grid">{project.fabrics.map((f,i)=><article key={i}><img src={f.image||project.cover_image} alt=""/><div><small>{f.collection}</small><h3>{f.name}</h3><p>{f.code}</p></div></article>)}</div></section><section className="workspace-section"><h2>Project Palette</h2><div className="palette">{project.palette.map((c,i)=><span key={i} title={c.name} style={{background:c.hex}}/>)}</div></section><section className="workspace-section"><h2>Inspiration Gallery</h2><div className="inspiration-grid">{project.inspiration_images.map((src,i)=><img key={i} src={src} alt=""/>)}</div></section></div><aside><section className="workspace-side"><h2>Members</h2><ul>{project.members.map((m,i)=><li key={i}><strong>{m.name}</strong><small>{m.role}</small></li>)}</ul></section><section className="workspace-side"><h2>Timeline</h2><ul>{project.timeline.map((t,i)=><li key={i}>{t.title}<small>{t.date}</small></li>)}</ul></section><section className="workspace-side"><h2>Activity</h2><ul>{project.recent_activity.map((a,i)=><li key={i}>{a.text}</li>)}</ul></section></aside></div></main>}

export function Favorites(){
  const [items,setItems]=useState<Favorite[]>([]);
  const [colorItems,setColorItems]=useState<ColorFavorite[]>([]);
  const [folders,setFolders]=useState<Folder[]>([]);
  const [folder,setFolder]=useState<number>();
  const [error,setError]=useState("");
  const load=()=>Promise.all([api.get<{data:Favorite[]}>("favorites",folder?{folder}:{}),api.get<{data:Folder[]}>("favorite-folders"),api.get<{data:ColorFavorite[]}>("color-favorites")]).then(([favoritesResponse,foldersResponse,colorsResponse])=>{setItems(favoritesResponse.data);setFolders(foldersResponse.data);setColorItems(colorsResponse.data);setError("")}).catch(requestError=>setError(errorMessage(requestError)));
  useEffect(()=>{load()},[folder]);
  const visibleColors=folder?[]:colorItems;
  return <main className="workspace"><header className="workspace-head"><div><h1>My Favorites</h1><p>A curated selection of your most refined fabric choices.</p></div></header>{error&&<p className="workspace-state" role="alert">{error}</p>}<div className="favorite-layout"><aside className="folder-list"><button className={!folder?"active":""} onClick={()=>setFolder(undefined)}>All Items ({items.length+colorItems.length})</button>{folders.map(f=><button className={folder===f.id?"active":""} onClick={()=>setFolder(f.id)} key={f.id}>{f.name} ({f.favorites_count})</button>)}</aside><section className="favorite-grid">
    {items.map(f=><article className="favorite-card" key={`favorite-${f.id}`}><img src={f.image_url} alt=""/><div className="favorite-copy"><h2>{f.name}</h2><p>{f.collection} · {f.material}</p><div className="favorite-actions"><button onClick={()=>navigator.share?.({title:f.name})}>Share</button><button onClick={()=>api.post(`favorites/${f.id}/sample-request`,{})}>Request Sample</button><button onClick={async()=>{await api.delete(`favorites/${f.id}`);load()}}>Remove</button></div></div></article>)}
    {visibleColors.map(color=><article className="favorite-card" key={`color-${color.id}`}>{color.swatch_path?<img src={color.swatch_path} alt={`${color.name} color swatch`}/>:<div className="favorite-color-swatch" style={{background:color.hex_code||"#777"}}/>}<div className="favorite-copy"><small>COLOR</small><h2>{color.name||color.code}</h2><p>{color.catalog?.name||"Catalog Color"} · {color.code}</p><div className="favorite-actions"><Link className="button" to={`/catalogs/${color.catalog?.id}/colors`}>View Color</Link><button onClick={async()=>{await api.patch(`colors/${color.id}/favorite`);load()}}>Remove</button></div></div></article>)}
    {!error&&items.length===0&&visibleColors.length===0&&<p className="workspace-state">No favorites in this folder yet.</p>}
  </section></div></main>
}
