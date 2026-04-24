package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.Ciudad;
import parcialfinal.example.gestiApar.service.CiudadService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/ciudad")
public class CiudadController {

    @Autowired
    private CiudadService service;

    @GetMapping
    public List<Ciudad> listar() {
        return service.listar();
    }

    // Endpoint para filtrar ciudades por departamento (usado por el combo en cascada)
    @GetMapping("/departamento/{idDepartamento}")
    public List<Ciudad> listarPorDepartamento(@PathVariable Long idDepartamento) {
        return service.listarPorDepartamento(idDepartamento);
    }

    @PostMapping
    public Ciudad guardar(@RequestBody Ciudad c) {
        return service.guardar(c);
    }

    @GetMapping("/{id}")
    public Ciudad obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PutMapping("/{id}")
    public Ciudad actualizar(@PathVariable Long id, @RequestBody Ciudad c) {
        c.setId(id);
        return service.guardar(c);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
