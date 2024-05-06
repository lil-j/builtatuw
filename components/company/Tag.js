import {ibm_plex_mono} from "@/fonts/ibm_plex_mono";

export default function Tag({children}) {
    return <div className={ibm_plex_mono.className + " text-white text-xs bg-black/30 px-2 py-1 rounded-full"}>
        {children}
    </div>
}