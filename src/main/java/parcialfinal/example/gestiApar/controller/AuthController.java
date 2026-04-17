package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import parcialfinal.example.gestiApar.model.LoginRequest;
import parcialfinal.example.gestiApar.model.RegisterRequest;
import parcialfinal.example.gestiApar.service.AuthService;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @PostMapping("/register")
    public Map<String, Object> registrar(@RequestBody RegisterRequest req) {
        return authService.registrar(req);
    }
}
