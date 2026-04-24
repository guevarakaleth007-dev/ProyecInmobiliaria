package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.Departamento;
import parcialfinal.example.gestiApar.service.DepartamentoService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/departamento")
public class DepartamentoController {

    @Autowired
    private DepartamentoService service;

    @GetMapping
    public List<Departamento> listar() {
        return service.listar();
    }

    // Endpoint para filtrar departamentos por país (usado por el combo en cascada)
    @GetMapping("/pais/{idPais}")
    public List<Departamento> listarPorPais(@PathVariable Long idPais) {
        return service.listarPorPais(idPais);
    }

    @PostMapping
    public Departamento guardar(@RequestBody Departamento d) {
        return service.guardar(d);
    }

    @GetMapping("/{id}")
    public Departamento obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PutMapping("/{id}")
    public Departamento actualizar(@PathVariable Long id, @RequestBody Departamento d) {
        d.setId(id);
        return service.guardar(d);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
