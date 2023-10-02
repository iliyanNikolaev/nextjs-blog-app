import EditForm from "@/components/edit-form/EditForm";
import apiHostURL from "@/utils/apiHostURL";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

const getTopicById = async (id) => {
    try {
        const res = await fetch(apiHostURL + '/api/posts/' + id, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Error in db!')
        }

        const post = await res.json();

        return { ok: true, post };
    } catch (err) {
        return { ok: false, error: err.message };
    }
}

export default async function EditTopic({ params }) {
    const session = await getServerSession();
    const loggedUsername = session?.user?.name?.username;
    if(!loggedUsername) {
        return redirect('/login');
    }
    const { id } = params;
    const data = await getTopicById(id);
    const postOwnerUsername = data.post?.owner;
    if(loggedUsername != postOwnerUsername) {
        return redirect('/dashboard');
    }
    
    return (
        <EditForm post={data.post}/>
    )
}