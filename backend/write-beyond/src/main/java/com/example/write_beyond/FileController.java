package com.example.write_beyond;
import com.example.write_beyond.model.File;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
//src/main/java/com/example/write_beyond/
//├─ controller/
//│  ├─ FileController.java
//│  ├─ UserController.java
//│  └─ BoardController.java
//├─ service/
//│  ├─ FileService.java
//│  └─ UserService.java
//├─ model/
//│  ├─ File.java
//│  └─ User.java
//├─ repository/
//│  ├─ FileRepository.java
//│  └─ UserRepository.java

//GET /api/files → retrieve all files
//
//POST /api/files → create a new file in that collection
//
//PUT /api/files/{id} → update a specific file
//
//DELETE /api/files/{id} → delete a specific file


@RestController
@RequestMapping("/api")
public class FileController {

    private List<File> files = new ArrayList<>();

    @GetMapping("/files")
    public List<File> getAllFiles() {
        //Automatically knows to convert List<File> to json because @RestMapping and spring converts it
//        List<File> newList = new ArrayList<>();
        return files;
    }

    @PostMapping("/files")
    public File createFile(@RequestBody File file) {
//        File f1 = new File();
        return file;
    }
}

