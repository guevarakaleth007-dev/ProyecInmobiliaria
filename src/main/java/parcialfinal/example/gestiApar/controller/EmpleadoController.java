package parcialfinal.example.gestiApar.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.Empleado;
import parcialfinal.example.gestiApar.service.EmpleadoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/empleado")
public class EmpleadoController {
    @Autowired private EmpleadoService service;

    @GetMapping              public List<Empleado> listar()                                  { return service.listar(); }
    @PostMapping             public Empleado guardar(@RequestBody Empleado e)                 { return service.guardar(e); }
    @GetMapping("/{id}")     public Empleado obtener(@PathVariable Long id)                   { return service.obtener(id); }
    @PutMapping("/{id}")     public Empleado actualizar(@PathVariable Long id, @RequestBody Empleado e) { e.setId(id); return service.guardar(e); }
    @DeleteMapping("/{id}")  public void eliminar(@PathVariable Long id)                      { service.eliminar(id); }
}
