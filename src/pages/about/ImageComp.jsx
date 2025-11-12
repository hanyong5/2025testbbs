import React, { useState } from 'react';
import { toast } from 'react-toastify';
import supabase from '../../utils/supabase';

function ImageComp() {
  const [selectFile, setSelectFile] = useState(null);
  const [message, setMessage] = useState('');

  const fileChangeHandler = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setSelectFile(file ?? null);
    setMessage('');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!selectFile) {
      setMessage('전송할 이미지를 선택하세요');
      return;
    }

    const bucket = 'images';
    const filepath = `${Date.now()}_${selectFile.name}`;

    // 파일이름을 uuid +"_" + selectFile.name -> 188912809182..._han.png
    // 파일이름을 날짜 +"_" + selectFile.name -> 202511121212_han.png
    // 파일이름을 난수 +"_" + selectFile.name

    const { error } = await supabase.storage
      .from(bucket)
      .upload(filepath, selectFile);

    if (error) {
      setMessage('업로드실패 : ' + error.message);
      return;
    } else {
      toast('업로드 완료되었습니다.');
    }
  };

  return (
    <div>
      <h3>이미지업로드</h3>
      <div>
        <form onSubmit={submitHandler}>
          <div>
            <input type="file" accept="image/*" onChange={fileChangeHandler} />
          </div>
          <button>test</button>
          <div>{message && <p className="text-danger mt-2">{message}</p>}</div>
        </form>
      </div>
    </div>
  );
}

export default ImageComp;
