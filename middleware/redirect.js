export default function ({store, redirect, route}) {
  if (route.path === '/prescription')
    return redirect('/prescription/list')
  if (route.path === '/setting')
    return redirect('/setting/user-management')
  else
    return redirect('/dashboard')

}
