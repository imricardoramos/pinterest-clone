import ProfilePicture from '~/components/ProfilePicture'
export default function StackedAvatars({ users }){
  return (
    <div className="relative">
      { users && users.map((user, index)=> (
        <div key={index} className="rounded-full overflow-hidden border-2 border-white absolute" style={{left: `${3*index}em`}}>
          <ProfilePicture user={user} size="2" />
        </div>
      ))}
    </div>
  )
}
