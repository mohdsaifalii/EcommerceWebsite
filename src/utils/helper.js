export default function isUserAuth()
{
    const isAuth = localStorage.getItem('airtribe-user-auth');
        if (!isAuth || isAuth !== 'authenticated' )
        {
            return false;
        }
        return true;
}
        
