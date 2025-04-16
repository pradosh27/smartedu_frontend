import { useSelector } from 'react-redux';
import styled from "styled-components";
const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <Wrapper>
            <div className='main'>
                <h1 style = {{fontSize : "2.5rem" , fontWeight : "bolder"}}>{currentUser.schoolName}</h1>
                <p style = {{fontSize : "1.6rem"}}>Name : {currentUser.name}</p>
                <p style = {{fontSize : "1.6rem"}}>Email : {currentUser.email}</p>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.section`
display : flex;
padding : 160px;
flex-direction : column;
justify-content : center;
align-items : center;
.main{
    padding : 80px;
    box-shadow : 5px 5px 5px 5px black;
    background : green;
    color : white;
}
`;
export default AdminProfile