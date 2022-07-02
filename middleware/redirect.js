export default function ({store, redirect, route}) {
  if (route.path === '/prescription')
    return redirect('/prescription/list')
  else
    return redirect('/dashboard')

}
