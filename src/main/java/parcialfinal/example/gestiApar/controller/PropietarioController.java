package parcialfinal.example.gestiApar.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.Propietario;
import parcialfinal.example.gestiApar.service.PropietarioService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/propietario")
public class PropietarioController {
    @Autowired private PropietarioService service;

    @GetMapping              public List<Propietario> listar()                                       { return service.listar(); }
    @PostMapping             public Propietario guardar(@RequestBody Propietario p)                   { return service.guardar(p); }
    @GetMapping("/{id}")     public Propietario obtener(@PathVariable Long id)                        { return service.obtener(id); }
    @PutMapping("/{id}")     public Propietario actualizar(@PathVariable Long id, @RequestBody Propietario p) { p.setId(id); return service.guardar(p); }
    @DeleteMapping("/{id}")  public void eliminar(@PathVariable Long id)                              { service.eliminar(id); }
}
