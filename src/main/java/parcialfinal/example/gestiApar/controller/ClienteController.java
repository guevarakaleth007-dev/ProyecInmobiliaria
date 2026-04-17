package parcialfinal.example.gestiApar.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parcialfinal.example.gestiApar.model.Cliente;
import parcialfinal.example.gestiApar.service.ClienteService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired private ClienteService service;

    @GetMapping              public List<Cliente> listar()                                    { return service.listar(); }
    @PostMapping             public Cliente guardar(@RequestBody Cliente c)                    { return service.guardar(c); }
    @GetMapping("/{id}")     public Cliente obtener(@PathVariable Long id)                    { return service.obtener(id); }
    @PutMapping("/{id}")     public Cliente actualizar(@PathVariable Long id, @RequestBody Cliente c) { c.setId(id); return service.guardar(c); }
    @DeleteMapping("/{id}")  public void eliminar(@PathVariable Long id)                      { service.eliminar(id); }
}
