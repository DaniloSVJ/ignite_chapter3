import fs from 'fs' //filesystem do próprio node

export const deleteFile = async(filename: string)=>{
    await fs.promises.stat(filename)

    try{
        await fs.promises.stat(filename)
    }catch{
        return;
    }

    await fs.promises.unlink(filename)

}