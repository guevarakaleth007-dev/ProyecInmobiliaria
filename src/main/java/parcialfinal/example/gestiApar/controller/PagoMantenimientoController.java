package parcialfinal.example.gestiApar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.PagoMantenimiento;
import parcialfinal.example.gestiApar.service.PagoMantenimientoService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pagoMantenimiento")
public class PagoMantenimientoController {

    @Autowired
    private PagoMantenimientoService service;

    @GetMapping
    public List<PagoMantenimiento> listar() {
        return service.listar();
    }

    @GetMapping("/mantenimiento/{idMantenimiento}")
    public List<PagoMantenimiento> listarPorMantenimiento(@PathVariable Long idMantenimiento) {
        return service.listarPorMantenimiento(idMantenimiento);
    }

    @GetMapping("/{id}")
    public PagoMantenimiento obtener(@PathVariable Long id) {
        return service.obtener(id);
    }

    @PostMapping
    public PagoMantenimiento guardar(@RequestBody PagoMantenimiento p) {
        return service.guardar(p);
    }

    @PutMapping("/{id}")
    public PagoMantenimiento actualizar(@PathVariable Long id, @RequestBody PagoMantenimiento p) {
        p.setId(id);
        return service.guardar(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
