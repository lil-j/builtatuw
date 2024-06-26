import { revalidatePath } from 'next/cache'
export async function GET(request) {
    revalidatePath('/[company]', 'page')
    revalidatePath('/', 'page')
    return Response.json({ revalidated: true, now: Date.now() })
}